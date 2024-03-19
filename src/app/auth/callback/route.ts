import { NextResponse } from "next/server";
import { getServerClient } from "~/lib/supabase/getServerClient";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await getServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('AUTH CALLBACK CALLED WITH CODE', code)
    console.log("data", data, "error", error);

    if (!error) {
      const redirect = `${origin}/${next}`;

      console.log('redirecting to', redirect) 

      return NextResponse.redirect(redirect);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
