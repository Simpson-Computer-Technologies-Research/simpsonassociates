import React from "react";

import { generateAuthorization } from "@/app/lib/auth";
import { useSession } from "next-auth/react";
import { SessionProvider } from "@/app/components/providers";

import LoadingCenter from "@/app/components/loading";
import "@/app/styles/globals.css";
import { User } from "@/app/lib/types";

/**
 * Google authentication session middleware
 * @param permissions the permissions required to access the page
 * @param unauthorized the component to render if the user is not authorized
 * @param success the component to render if the user is authorized
 * @returns JSX.Element
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
  const [permissionsFetched, setPermissionsFetched] =
    React.useState<boolean>(false);
  const [authorizationUpdated, setAuthorizationUpdated] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login?redirect=/agents/dashboard";
      return;
    }
  }, [session]);

  // Fetch the users permissions
  if (!permissionsFetched && status === "authenticated") {
    generateAuthorization(
      session?.accessToken || "",
      session?.user?.email || "",
    ).then((auth) => {
      fetchPermissions(auth).then((permissions) => {
        setUserPermissions(permissions);
        setPermissionsFetched(true);
      });
    });
  }

  // If the session is loading or not authenticated, return a loading component
  // This should be already handled with the above useEffect, but just in case.
  if (status !== "authenticated" || !permissionsFetched)
    return <LoadingCenter />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (!permissions.every((p: any) => userPermissions.includes(p)))
    return unauthorized();

  // Update the users authorization token
  if (!authorizationUpdated) {
    generateAuthorization(
      session?.accessToken || "",
      session?.user?.email || "",
    ).then(
      async (auth) =>
        await updateAuthorization(auth).then(() =>
          setAuthorizationUpdated(true),
        ),
    );
  }

  // Return the success component
  const user: User = {
    email: session?.user?.email,
    accessToken: session?.accessToken,
    name: session?.user?.name,
    image: session?.user?.image,
    permissions: userPermissions,
  };
  return success(user);
}

/**
 * Fetch the users permissions
 * @param auth the users access token and email base64 encoded
 * @returns the users permissions
 */
export const fetchPermissions = async (auth: string): Promise<string[]> => {
  if (!auth) return [];

  // Fetch the permissions
  return await fetch("/api/agents/permissions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: auth,
    },
  })
    .then((res) => res.json())
    .then((json) => json.permissions);
};

/**
 * Update the users access token
 * @param authorization the users access token and email base64 encoded
 * @returns void
 */
export const updateAuthorization = async (
  authorization: string | null | undefined,
): Promise<void> => {
  if (!authorization) return;

  await fetch("/api/agents/authorization", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });
};
