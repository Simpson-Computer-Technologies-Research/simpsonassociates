import { SessionProvider, signOut, useSession } from "next-auth/react";

import React from "react";

import Loading from "@/app/components/loading";
import "@/styles/globals.css";

/**
 * Google authentication session middleware
 */
export default function SessionMiddleware({ children }: any): JSX.Element {
  return (
    <SessionProvider>
      <_SessionMiddleware>{children}</_SessionMiddleware>
    </SessionProvider>
  );
}

/**
 * Verify that the user is an agent
 */
const verifyAgent = async (
  email: string | null | undefined,
): Promise<boolean> => {
  if (!email) return false;
  return await fetch("/api/agents/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => res.status === 200);
};

/**
 * Google authentication session middleware
 * @returns JSX.Element
 */
function _SessionMiddleware({ children }: any): JSX.Element {
  const { data: session, status } = useSession();
  const [isAgent, setIsAgent] = React.useState<boolean | null>(null);

  // If the session is loading, return a loading component
  React.useEffect(() => {
    if (
      (!session || !session.user || !session.user.email) &&
      status !== "loading"
    ) {
      window.location.href = "/login?redirect=/agents/dashboard";
      return;
    }
  }, [session]);

  // If the session is loading, return a loading component
  // No need to handle "unauthenticated" because the user will
  // automatically be promted to sign in
  if (status === "loading") return <Loading />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (isAgent === null) {
    verifyAgent(session?.user?.email).then((res) => setIsAgent(res));
  }

  // If the user is not an agent, return an error message
  if (!isAgent) {
    return (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
        <p className="text-4xl font-bold text-white">You are not an agent</p>
        <button
          className="mt-4 rounded-md bg-white px-10 py-2.5 font-medium text-primary"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </section>
    );
  }

  // Return the children
  return children;
}
