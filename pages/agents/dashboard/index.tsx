import React from "react";
import PermissionMiddleware from "@/pages/agents/middleware";
import { signOut } from "next-auth/react";

import "@/styles/globals.css";

/**
 * Dashboard page
 * @returns {JSX.Element} JSX.Element
 */
export default function Dashboard(): JSX.Element {
  return (
    <PermissionMiddleware
      permissions={["agent"]}
      success={Success}
      unauthorized={Unauthorized}
    />
  );
}

/**
 * Success section
 */
const Success = (email: string, permissions: string[]): JSX.Element => (
  <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
    <p className="text-4xl font-bold text-white">Agent Dashboard</p>
    <p className="text-2xl font-bold text-white">{email}</p>
    <p className="text-2xl font-bold text-white">{permissions}</p>
    {permissions &&
      permissions.map((permission: any) => (
        <p className="text-2xl font-bold text-white">{permission}</p>
      ))}
  </section>
);

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
