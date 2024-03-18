import { type User } from "~/lib/auth/auth.utils";

export function UserName({ user }: { user: User | null }) {
  return (
    <div>
      <h1>
        {user
          ? `User signed in: ${user.firstName} ${user.lastName}`
          : "Not signed in!"}
      </h1>
    </div>
  );
}
