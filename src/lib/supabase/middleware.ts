"use server";

import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "./getServerClient";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = await getServerClient();

  await supabase.auth.getUser();

  return response;
}
