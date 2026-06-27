import { QueryBuilder } from "@/lib/db/queryBuilder";
import { getSessionUser } from "@/lib/auth/session";

// NOTE: This file keeps the historical name/path (`@/lib/supabase/server`) so
// the data/dashboard files don't need to change their imports — but it is now
// a thin MySQL-backed client, NOT Supabase. `createClient()` returns an object
// exposing the small subset of the Supabase API the app uses:
//   • supabase.from(table)  → a MySQL query builder
//   • supabase.auth.getUser → reads the JWT session cookie
export async function createClient() {
  return {
    from(table: string) {
      return new QueryBuilder(table);
    },
    auth: {
      async getUser() {
        const user = await getSessionUser();
        return { data: { user }, error: null };
      },
    },
  };
}
