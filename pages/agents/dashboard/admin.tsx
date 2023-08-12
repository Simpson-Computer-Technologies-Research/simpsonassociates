import React from "react";
import SessionMiddleware from "@/pages/agents/middleware";
import { verifyPermissions } from "@/lib/verification";

import "@/styles/globals.css";

/**
 * Dashboard page
 * @returns {JSX.Element} JSX.Element
 */
export default function AdminDashboard(): JSX.Element {
  return (
    <SessionMiddleware
      verify={async (email: string | null | undefined) =>
        await verifyPermissions(email, ["agent", "admin"])
      }
    >
      <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
        <p className="text-4xl font-bold text-white">Admin Agent Dashboard</p>
      </section>
    </SessionMiddleware>
  );
}
