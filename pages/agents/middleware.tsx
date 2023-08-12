import React from "react";

import { signOut, useSession } from "next-auth/react";

import { SessionProvider } from "@/app/components/providers";
import Loading from "@/app/components/loading";

import "@/styles/globals.css";

/**
 * Google authentication session middleware
 */
export default function SessionMiddleware(props: {
  children: any;
  verify: (email: string | null | undefined) => Promise<boolean>;
}): JSX.Element {
  return (
    <SessionProvider>
      <_SessionMiddleware verify={props.verify} children={props.children} />
    </SessionProvider>
  );
}

/**
 * Google authentication session middleware
 * @returns JSX.Element
 */
function _SessionMiddleware(props: {
  children: any;
  verify: (email: string | null | undefined) => Promise<boolean>;
}): JSX.Element {
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

  // If the session is loading or not authenticated, return a loading component
  if (status !== "authenticated") return <Loading />;

  // Now that we know the user has been authenticated (via google auth),
  // we need to verify that the user is an agent.
  if (isAgent === null) {
    props.verify(session?.user?.email).then((res: boolean) => setIsAgent(res));
  }

  // If the user is not an agent, return an error message
  if (!isAgent) return <NotAnAgent />;

  // Return the children
  return <>{props.children}</>;
}

/**
 * Not an agent section
 */
const NotAnAgent = (): JSX.Element => (
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
