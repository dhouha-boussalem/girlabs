import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let _client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Guard against placeholder values left in the example env file
  if (!url || !key || key.startsWith("<")) return null;

  _client = createClient<Database>(url, key);
  return _client;
}
