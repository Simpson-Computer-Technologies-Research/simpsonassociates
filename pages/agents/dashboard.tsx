import { signIn, useSession, SessionProvider, signOut } from "next-auth/react";

import React from "react";
import { useEffect } from "react";

import Loading from "@/app/components/loading";
import "@/styles/globals.css";

/**
 * Dashboard component
 */
const Dashboard = (): JSX.Element => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
      <p className="text-4xl font-bold text-white">Login Successful</p>
      <SignoutButton />
    </section>
  );
};

/**
 * Verify that the user is an agent
 */
const verifyAgent = async (email: string): Promise<boolean> => {
  return await fetch("/api/agents/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => res.status == 200);
};

const SignoutButton = (): JSX.Element => (
  <button
    className="mt-4 rounded-xl bg-white px-10 py-3"
    onClick={() => signOut()}
  >
    Sign out
  </button>
);

/**
 * Get the google auth session
 * @returns JSX.Element
 */
const Session = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [isAgent, setIsAgent] = React.useState<boolean>(false);

  useEffect(() => {
    // If the user is not authenticated, sign them in
    if (!session && status === "unauthenticated") signIn("google");

    // If the user is authenticated, check if they are an agent
    if (session && status === "authenticated") {
      if (!session || !session.user || !session.user.email) return;

      // Verify the agent, if not verified give them a message
      verifyAgent(session.user.email).then((res) => setIsAgent(res));
    }
  }, [session, status]);

  // If the user hasn't signed in yet, return a loading component
  if (status !== "authenticated") return <Loading />;

  // If the user is not an agent, return an error message
  if (!isAgent)
    return (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
        <p className="text-4xl font-bold text-white">You are not an agent</p>
        <SignoutButton />
      </section>
    );

  // Return the dashboard
  return <Dashboard />;
};

/**
 * Return the component jsx
 */
export default function AgentLogin(props: any): JSX.Element {
  return (
    <SessionProvider session={props.session}>
      <Session />
    </SessionProvider>
  );
}
