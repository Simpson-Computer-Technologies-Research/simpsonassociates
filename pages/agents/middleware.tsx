"use client";

import React from "react";

import { useSession } from "next-auth/react";

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
  const [userPermissions, setUserPermissions] = React.useState<string[]>([]);
  const [permissionsStatus, setPermissionsStatus] =
    React.useState<string>("none");

  // If the session is loading, return a loading component
  React.useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login?redirect=/agents/dashboard";
      return;
    }
  }, [session]);

  // If the session is loading or not authenticated, return a loading component
  // This should be already handled with the above useEffect, but just in case.
  if (status === "loading" || permissionsStatus === "loading")
    return <Loading />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (permissionsStatus === "none") {
    setPermissionsStatus("loading");
    fetchPermissions(session?.user?.email).then((res) => {
      setUserPermissions(res);
      setPermissionsStatus("done");
    });
  }

  // If the user is not an agent, return an error message
  if (
    (!userPermissions ||
      !permissions.every((p: any) => userPermissions.includes(p))) &&
    permissionsStatus === "done"
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

/**
 * Fetch the users permissions
 * @param email The email of the user
 * @param permissions The permissions to check
 * @returns the users permissions
 */
export const fetchPermissions = async (
  email: string | null | undefined,
): Promise<string[]> => {
  // If there is no email, return an empty array
  if (!email) return [];

  // Fetch the permissions
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
