import React from "react";
import SessionMiddleware from "@/pages/agents/middleware";

import "@/styles/globals.css";
import { verifyPermissions } from "@/lib/verification";

/**
 * Dashboard page
 * @returns {JSX.Element} JSX.Element
 */
export default function Dashboard(): JSX.Element {
  return (
    <SessionMiddleware
      verify={async (email: string | null | undefined) =>
        await verifyPermissions(email, ["agent", "admin"])
      }
    >
      <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
        <p className="text-4xl font-bold text-white">Agent Dashboard</p>
      </section>
    </SessionMiddleware>
  );
}
