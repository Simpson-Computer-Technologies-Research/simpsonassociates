"use client";

import { User } from "@/lib/types";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

/**
 * Side menu for the admin agent dashboard
 * @param props
 * @returns JSX.Element
 */
export default function SideMenu(props: { user: User }): JSX.Element {
  return (
    <div className="z-[1] flex h-auto w-screen flex-col bg-slate-50 p-4 sm:fixed sm:h-screen sm:w-64">
      <div className="flex flex-row items-center justify-start">
        <Image
          src={props.user.image || "/images/default_agent_headshot.png"}
          alt="..."
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="ml-4 text-3xl font-bold text-primary">Agent</p>
      </div>
      <p className="mb-1 mt-3 text-sm font-medium text-primary/80">
        Welcome, {props.user.name}
      </p>
      <p className="mb-2 text-xs font-medium text-primary/50">
        {props.user.email}
      </p>
      <Link
        href="/agents/dashboard/#events"
        className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
      >
        Events
      </Link>
      <button
        onClick={() => signOut()}
        className="relative bottom-4 mt-8 rounded-md bg-primary px-10 py-2.5 text-start font-medium text-white hover:brightness-110 sm:absolute"
      >
        Sign out
      </button>
    </div>
  );
}
