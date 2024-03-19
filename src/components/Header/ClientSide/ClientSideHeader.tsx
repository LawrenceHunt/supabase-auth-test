"use client";

import { getUserFromSupabaseUser, type User } from "~/lib/auth/auth.utils";
import { UserName } from "../UserName";
import { getBrowserClient } from "~/lib/supabase/getBrowserClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

function useUser() {
  const supabase = getBrowserClient();

  const [user, setUser] = useState<User | null>(null);

  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("event", event, "session", session);

    if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
      if (user) {
        return;
      }

      if (!session?.user) {
        setUser(null);
      }

      const parsedUser = session?.user
        ? getUserFromSupabaseUser(session.user)
        : null;

      setUser(parsedUser);
    }

    if (event === "SIGNED_OUT") {
      setUser(null);
    }
  });

  return { user };
}

const signout = async (onSuccess: () => void) => {
  const supabase = getBrowserClient();
  await supabase.auth.signOut();
  void onSuccess();
};

function SignoutButton({ onSuccess }: { onSuccess: () => void }) {
  return (
    <button
      onClick={() => signout(onSuccess)}
      className="rounded-md bg-red-500 p-4 px-8 text-white hover:bg-red-600"
    >
      Sign out
    </button>
  );
}

const signin = async () => {
  const supabase = getBrowserClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
};

function SigninButton() {
  return (
    <button
      onClick={signin}
      className="rounded-md bg-blue-500 p-4 px-8 text-white hover:bg-blue-600"
    >
      Sign in
    </button>
  );
}

export function ClientSideHeader() {
  const { user } = useUser();

  const router = useRouter();

  const onSuccess = () => {
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 border-2 border-blue-400 p-4">
      <h1 className="text-blue-400">Client side</h1>

      <SigninButton />

      <SignoutButton onSuccess={onSuccess} />

      <UserName user={user} />
    </div>
  );
}
