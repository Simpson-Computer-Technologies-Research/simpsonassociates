import { useEffect } from "react";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import Loading from "@/app/components/loading";
import "@/styles/globals.css";

/**
 * Manages the users google auth session
 * @returns JSX.Element
 */
const Session = (): JSX.Element => {
  const { data: session, status } = useSession();
  
  // Sign the user in if not already
  useEffect(() => {
    if (!session && status === "unauthenticated") signIn("google");
  }, [session, status]);

  // If the user hasn't signed in yet, return a loading component
  if (status !== "authenticated") return <Loading />;

  // Return the success template
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
      <p className="text-4xl font-bold tracking-wide text-white">
        Login Successful
      </p>
      <p className="mt-2 text-base font-normal text-white">
        You may now close this tab
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        className="mt-8 animate-bounce fill-white"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z" />
      </svg>
    </section>
  );
};

export default function ContactLogin(props: any): JSX.Element {
  return (
    <SessionProvider session={props.session}>
      <Session />
    </SessionProvider>
  );
}
