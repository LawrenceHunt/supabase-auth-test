import { type User as SupabaseUser } from "@supabase/gotrue-js/dist/main/lib/types";
export { SupabaseUser }

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  provider: "email" | "google";
  avatarUrl: string | null;
};

// this can get called from the server and the client, so
// pass corresponding supabase client in from each context.
export function getUserFromSupabaseUser(user: SupabaseUser): User {
  const userMetadata = user.user_metadata;
  const appMetadata = user.app_metadata;
  const provider = appMetadata.provider as "email" | "google";

  const fullName = userMetadata.full_name as string;
  const firstName =
    (userMetadata.firstName as string) ?? fullName.split(" ")[0] ?? "";
  const lastName =
    (userMetadata.lastName as string) ?? fullName.split(" ")[1] ?? "";

  return {
    id: user.id,
    email: user.email ?? "",
    firstName,
    lastName,
    fullName: (userMetadata.full_name as string) ?? `${firstName} ${lastName}`,
    provider,
    avatarUrl: (userMetadata.avatar_url as string) ?? "",
  };
}
