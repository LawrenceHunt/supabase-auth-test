"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "~/env";
import { type Database } from "~/types/supabase.types";

export function getBrowserClient() {
  const client = createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return client;
}
