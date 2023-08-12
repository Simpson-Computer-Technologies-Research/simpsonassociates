import React from "react";

import { useSession } from "next-auth/react";
import { validSessionEmail } from "@/lib/login";

import { SessionProvider } from "@/app/components/providers";
import Loading from "@/app/components/loading";

import "@/styles/globals.css";

/**
 * Google authentication session middleware
 */
export default function PermissionMiddleware({
  permissions,
  unauthorized,
  success,
}: any): JSX.Element {
  return (
    <SessionProvider>
      <_PermissionMiddleware
        permissions={permissions}
        unauthorized={unauthorized}
        success={success}
      />
    </SessionProvider>
  );
}

/**
 * Google authentication session middleware
 * @returns JSX.Element
 */
function _PermissionMiddleware({
  permissions,
  unauthorized,
  success,
}: any): JSX.Element {
  const { data: session, status } = useSession();
  const [userPermissions, setUserPermissions] = React.useState<string[] | null>(
    null,
  );

  // If the session is loading, return a loading component
  React.useEffect(() => {
    if (!validSessionEmail(session, status)) {
      window.location.href = "/login?redirect=/agents/dashboard";
      return;
    }
  }, [session]);

  // If the session is loading or not authenticated, return a loading component
  if (status !== "authenticated") return <Loading />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (userPermissions === null) {
    getPermissions(session?.user?.email).then((res) => setUserPermissions(res));
  }

  // If the user is not an agent, return an error message
  if (
    !userPermissions ||
    !permissions.every((p: any) => userPermissions.includes(p))
  )
    return unauthorized();

  // Return the children and pass the permissions to them
  return success(session?.user?.email, userPermissions);
}

/**
 *
 * @param email The email of the user
 * @param permissions The permissions to check
 * @returns
 */
const getPermissions = async (
  email: string | null | undefined,
): Promise<string[]> => {
  if (!email) return [];
  return await fetch("/api/agents/permissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((json) => json.permissions);
};
