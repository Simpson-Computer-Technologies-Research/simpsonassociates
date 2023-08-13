"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { invalidSession, fetchPermissions } from "@/lib/auth";

import { SessionProvider } from "@/app/components/providers";
import Loading from "@/app/components/loading";

import "@/styles/globals.css";

/**
 * User class
 */
export interface User {
  email: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  permissions: string[];
}

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
    if (invalidSession(session, status)) {
      window.location.href = "/login?redirect=/agents/dashboard";
      return;
    }
  }, [session]);

  // If the session is loading or not authenticated, return a loading component
  if (!session || status !== "authenticated") return <Loading />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (userPermissions === null) {
    fetchPermissions(session?.user?.email).then((res) =>
      setUserPermissions(res),
    );
  }

  // If the user is not an agent, return an error message
  if (
    !userPermissions ||
    !permissions.every((p: any) => userPermissions.includes(p))
  )
    return unauthorized();

  // Return the children and pass the permissions to them
  const user: User = {
    email: session?.user?.email,
    name: session?.user?.name,
    image: session?.user?.image,
    permissions: userPermissions,
  };
  return success(user);
}
