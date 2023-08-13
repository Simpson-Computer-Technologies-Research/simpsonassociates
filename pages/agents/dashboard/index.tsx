"use client";

import React from "react";
import Link from "next/link";

import { PermissionMiddleware, User } from "@/pages/agents/middleware";
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
const Success = (user: User): JSX.Element => (
  <section className="flex flex-col">
    <SideMenu user={user} />
    <div className="relative ml-72">
      <News />
      <Events />
      <Lenders />
    </div>
  </section>
);

/**
 * Side menu
 */
const SideMenu = (props: { user: User }): JSX.Element => (
  <section className="fixed z-10 flex h-screen w-72 flex-col bg-slate-50 p-4">
    <div className="flex flex-row items-center justify-start">
      <img
        src={props.user.image || "/images/default_agent_headshot.png"}
        alt="..."
        width={50}
        height={50}
        className="rounded-full"
      />
      <p className="ml-4 text-3xl font-bold text-primary">Agent</p>
    </div>
    <p className="mb-7 mt-3 text-sm font-medium text-primary/80">
      Welcome, {props.user.name}
    </p>
    <a
      href="#news"
      className="bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      News
    </a>
    <a
      href="#events"
      className="mt-4 bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Events
    </a>
    <a
      href="#lenders"
      className="mt-4 bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Lenders
    </a>
    <Link
      href="/agents/dashboard/admin"
      rel="noopener noreferrer"
      target="_blank"
      className="mt-4 bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Manage (Admin)
    </Link>
    <button
      onClick={() => signOut()}
      className="absolute bottom-4 bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Sign out
    </button>
  </section>
);

/**
 * News section
 */
const News = (): JSX.Element => (
  <section id="news" className="flex h-96 w-full flex-col bg-primary p-7">
    <h1 className="text-4xl font-bold text-white">News</h1>
    <p className="mt-2 text-sm text-white">
      Keep up with the latest mortgage news and updates
    </p>
  </section>
);

/**
 * Events section
 */
const Events = (): JSX.Element => (
  <section id="events" className="flex h-96 w-full flex-col bg-white p-7">
    <h1 className="text-4xl font-bold text-primary">Events</h1>
    <p className="mt-2 text-sm text-primary">
      Keep up with upcoming company events and meetings
    </p>
  </section>
);

/**
 * Lenders
 */
const Lenders = (): JSX.Element => (
  <section id="lenders" className="flex h-96 w-full flex-col bg-primary p-7">
    <h1 className="text-4xl font-bold text-white">Lenders</h1>
    <p className="mt-2 text-sm text-white">
      Make comments and keep up to date with lenders
    </p>
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
