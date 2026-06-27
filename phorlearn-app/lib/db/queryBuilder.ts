/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPool } from "./pool";

// The resolved `data` is typed as `any` on purpose: the original Supabase
// client is untyped here too, so this keeps every existing call site
// (`wards?.[0]`, `data ?? []`, `... as Row[]`) compiling unchanged.

// A tiny, intentionally-minimal re-implementation of the subset of the
// Supabase query API that this app actually uses, backed by MySQL. It lets the
// dashboard/data files keep their `supabase.from(...).select(...).eq(...)`
// style unchanged after the migration off Supabase.

type Op = "=" | ">=" | ">" | "<=" | "<";
interface Filter {
  col: string;
  op: Op;
  val: unknown;
}
type Mode = "select" | "insert" | "update" | "upsert";

export interface DbResult<T = any> {
  data: T;
  error: { message: string } | null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

// Normalise JS values into something mysql2 stores correctly.
function norm(v: unknown): unknown {
  if (typeof v === "string" && ISO_DATE.test(v)) return new Date(v);
  if (typeof v === "boolean") return v ? 1 : 0;
  return v;
}

// Backtick-quote a bare identifier (defensive — all identifiers here are
// hard-coded in app code, never user input).
function ident(name: string): string {
  return "`" + name.replace(/[^a-zA-Z0-9_]/g, "") + "`";
}

export class QueryBuilder implements PromiseLike<DbResult<any>> {
  private mode: Mode = "select";
  private cols = "*";
  private filters: Filter[] = [];
  private orderCol?: string;
  private orderAsc = true;
  private limitN?: number;
  private rowMode: "no" | "maybe" | "one" = "no";
  private values?: Record<string, unknown> | Record<string, unknown>[];
  private conflict?: string;

  constructor(private table: string) {}

  select(cols = "*") {
    this.cols = cols || "*";
    return this;
  }
  eq(col: string, val: unknown) {
    this.filters.push({ col, op: "=", val });
    return this;
  }
  gte(col: string, val: unknown) {
    this.filters.push({ col, op: ">=", val });
    return this;
  }
  gt(col: string, val: unknown) {
    this.filters.push({ col, op: ">", val });
    return this;
  }
  lte(col: string, val: unknown) {
    this.filters.push({ col, op: "<=", val });
    return this;
  }
  lt(col: string, val: unknown) {
    this.filters.push({ col, op: "<", val });
    return this;
  }
  order(col: string, opts?: { ascending?: boolean }) {
    this.orderCol = col;
    this.orderAsc = opts?.ascending !== false;
    return this;
  }
  limit(n: number) {
    this.limitN = n;
    return this;
  }
  maybeSingle() {
    this.rowMode = "maybe";
    return this;
  }
  single() {
    this.rowMode = "one";
    return this;
  }
  insert(values: Record<string, unknown> | Record<string, unknown>[]) {
    this.mode = "insert";
    this.values = values;
    return this;
  }
  update(values: Record<string, unknown>) {
    this.mode = "update";
    this.values = values;
    return this;
  }
  upsert(values: Record<string, unknown>, opts?: { onConflict?: string }) {
    this.mode = "upsert";
    this.values = values;
    this.conflict = opts?.onConflict;
    return this;
  }

  private whereClause(): { sql: string; params: unknown[] } {
    if (!this.filters.length) return { sql: "", params: [] };
    const parts = this.filters.map((f) => `${ident(f.col)} ${f.op} ?`);
    return {
      sql: " where " + parts.join(" and "),
      params: this.filters.map((f) => norm(f.val)),
    };
  }

  private selectCols(): string {
    const c = this.cols.trim();
    if (c === "*") return "*";
    return c
      .split(",")
      .map((s) => ident(s.trim()))
      .join(", ");
  }

  private async run(): Promise<DbResult<any>> {
    const pool = getPool();
    const t = ident(this.table);

    if (this.mode === "select") {
      const w = this.whereClause();
      let sql = `select ${this.selectCols()} from ${t}${w.sql}`;
      if (this.orderCol) {
        sql += ` order by ${ident(this.orderCol)} ${this.orderAsc ? "asc" : "desc"}`;
      }
      if (this.limitN != null) sql += ` limit ${Number(this.limitN)}`;
      else if (this.rowMode !== "no") sql += " limit 1";
      const [rows] = await pool.query(sql, w.params);
      const arr = rows as unknown[];
      if (this.rowMode !== "no") return { data: arr[0] ?? null, error: null };
      return { data: arr, error: null };
    }

    if (this.mode === "insert") {
      const rowsArr = Array.isArray(this.values) ? this.values : [this.values!];
      if (!rowsArr.length) return { data: null, error: null };
      const keys = Object.keys(rowsArr[0]);
      const colSql = keys.map(ident).join(", ");
      const placeholders = rowsArr
        .map(() => `(${keys.map(() => "?").join(", ")})`)
        .join(", ");
      const params = rowsArr.flatMap((r) =>
        keys.map((k) => norm((r as Record<string, unknown>)[k]))
      );
      await pool.query(
        `insert into ${t} (${colSql}) values ${placeholders}`,
        params
      );
      return { data: null, error: null };
    }

    if (this.mode === "update") {
      const v = this.values as Record<string, unknown>;
      const keys = Object.keys(v);
      const setSql = keys.map((k) => `${ident(k)} = ?`).join(", ");
      const w = this.whereClause();
      const params = [...keys.map((k) => norm(v[k])), ...w.params];
      await pool.query(`update ${t} set ${setSql}${w.sql}`, params);
      return { data: null, error: null };
    }

    // upsert → INSERT ... ON DUPLICATE KEY UPDATE
    const v = this.values as Record<string, unknown>;
    const keys = Object.keys(v);
    const colSql = keys.map(ident).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const conflictCols = (this.conflict ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const updateKeys = keys.filter((k) => !conflictCols.includes(k));
    const updateSql = (updateKeys.length ? updateKeys : keys)
      .map((k) => `${ident(k)} = values(${ident(k)})`)
      .join(", ");
    const params = keys.map((k) => norm(v[k]));
    await pool.query(
      `insert into ${t} (${colSql}) values (${placeholders}) on duplicate key update ${updateSql}`,
      params
    );
    return { data: null, error: null };
  }

  then<R1 = DbResult<any>, R2 = never>(
    onfulfilled?: ((value: DbResult<any>) => R1 | PromiseLike<R1>) | null,
    onrejected?: ((reason: unknown) => R2 | PromiseLike<R2>) | null
  ): Promise<R1 | R2> {
    return this.run()
      .catch(
        (e): DbResult<any> => ({
          data: null,
          error: { message: e instanceof Error ? e.message : String(e) },
        })
      )
      .then(onfulfilled, onrejected);
  }
}
