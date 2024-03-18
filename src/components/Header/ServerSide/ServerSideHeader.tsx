"use server";

import { getUserFromSupabaseUser } from "~/lib/auth/auth.utils";
import { UserName } from "../UserName";

import { getServerClient } from "~/lib/supabase/getServerClient";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const signout = async () => {
  "use server";
  const supabase = await getServerClient();
  await supabase.auth.signOut();

  console.log("redirecting after signout");

  redirect("/");
};

async function SignoutButton() {
  return (
    <form action={signout}>
      <button className="rounded-md bg-red-500 p-4 px-8 text-white hover:bg-red-600">
        Sign out
      </button>
    </form>
  );
}

const signin = async () => {
  "use server";

  const supabase = await getServerClient();
  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    redirect(`${origin}/auth/auth-code-error`);
  }
};

async function SigninButton() {
  return (
    <form action={signin}>
      <button className="rounded-md bg-blue-500 p-4 px-8 text-white hover:bg-blue-600">
        Sign in
      </button>
    </form>
  );
}

export async function ServerSideHeader() {
  const supabase = await getServerClient();

  const { data } = await supabase.auth.getUser();

  console.log("data", data);

  const parsedUser = data?.user ? getUserFromSupabaseUser(data.user) : null;

  return (
    <div className="flex items-center gap-4 border border-red-600 p-4">
      <h1 className="text-red-600">Server side</h1>
      <SigninButton />
      <SignoutButton />

      <UserName user={parsedUser} />
    </div>
  );
}
