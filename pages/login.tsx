"use client";

import { signIn, useSession, SessionProvider } from "next-auth/react";

import React from "react";
import { useEffect } from "react";

import Loading from "@/app/components/loading";
import "@/app/styles/globals.css";

/**
 * Return the component jsx
 */
export default function Login(props: {
  session: any;
  redirect: string;
}): JSX.Element {
  const [redirect, setRedirect] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setRedirect(params.get("redirect"));
  }, []);

  return (
    <SessionProvider session={props.session}>
      <_Login redirect={redirect} />
    </SessionProvider>
  );
}

/**
 * Get the google auth session
 * @returns JSX.Element
 */
const _Login = (props: { redirect: string | null }): JSX.Element => {
  const { data: session, status } = useSession();

  // If the user is not logged in, log them in
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  }, [session]);

  // Depending on the response, return the appropriate component
  if (status === "authenticated") {
    if (props.redirect) window.location.href = props.redirect;
    else return <SuccessLogin />;
  }

  return <Loading />;
};

/**
 * Successful login response
 */
const SuccessLogin = (): JSX.Element => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-primary">
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
  </div>
);
