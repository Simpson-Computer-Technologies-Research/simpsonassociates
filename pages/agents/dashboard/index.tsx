import Head from "next/head";
import { signOut } from "next-auth/react";

import PermissionMiddleware from "@/pages/agents/dashboard/middleware";
import Success from "@/app/components/pages/agentdashboard/success";

import "@/app/styles/globals.css";

/**
 * Dashboard page
 * @returns {JSX.Element} JSX.Element
 */
export default function Dashboard(): JSX.Element {
  return (
    <>
      <Head>
        <title>Agent Dashboard | Simpson & Associates</title>
      </Head>
      <PermissionMiddleware
        permissions={["agent"]}
        success={Success}
        unauthorized={Unauthorized}
      />
    </>
  );
}

/**
 * Not an agent section
 */
const Unauthorized = (): JSX.Element => (
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
