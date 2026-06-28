import mysql from "mysql2/promise";

// Reuse a single pool across hot-reloads in dev (Next.js re-evaluates modules).
declare global {
  // eslint-disable-next-line no-var
  var __phorlearnPool: mysql.Pool | undefined;
}

// Managed/cloud MySQL providers (TiDB Cloud, Aiven, Clever Cloud, etc.)
// require TLS. Enable it by setting MYSQL_SSL=true. Some providers use a
// self-signed cert chain — set MYSQL_SSL_REJECT_UNAUTHORIZED=false for those.
// Local development (MySQL Workbench) leaves MYSQL_SSL unset, so SSL is off.
function sslOption(): mysql.PoolOptions["ssl"] {
  if (process.env.MYSQL_SSL !== "true") return undefined;
  return {
    minVersion: "TLSv1.2",
    rejectUnauthorized: process.env.MYSQL_SSL_REJECT_UNAUTHORIZED !== "false",
  };
}

export function getPool(): mysql.Pool {
  if (!global.__phorlearnPool) {
    global.__phorlearnPool = mysql.createPool({
      host: process.env.MYSQL_HOST ?? "localhost",
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",
      database: process.env.MYSQL_DATABASE ?? "phorlearn",
      ssl: sslOption(),
      waitForConnections: true,
      connectionLimit: 10,
      enableKeepAlive: true,
    });
  }
  return global.__phorlearnPool;
}

/** Runs a parameterised query and returns the rows. */
export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
