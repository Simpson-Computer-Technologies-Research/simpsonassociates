"use client";

import React from "react";
import Link from "next/link";

import PermissionMiddleware, { User } from "@/pages/agents/middleware";
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
      <Events user={user} />
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
    <p className="mb-1 mt-3 text-sm font-medium text-primary/80">
      Welcome, {props.user.name}
    </p>
    <p className="mb-2 text-xs font-medium text-primary/50">
      {props.user.email}
    </p>
    <a
      href="#events"
      className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Events
    </a>
    <a
      href="#lenders"
      className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Lenders
    </a>
    <Link
      href="/agents/dashboard/admin"
      rel="noopener noreferrer"
      target="_blank"
      className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Manage (Admin)
    </Link>
    <button
      onClick={() => signOut()}
      className="absolute bottom-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
    >
      Sign out
    </button>
  </section>
);

/**
 * Events section
 */
const Events = (props: { user: User }): JSX.Element => (
  <section id="events" className="flex h-fit w-full flex-col bg-primary p-7">
    <h1 className="text-4xl font-bold text-white">Events</h1>
    <p className="mt-2 text-sm text-white">
      Keep up with upcoming company events and meetings
    </p>
    <div className="flex flex-row">
      <PostEventCard user={props.user} />
    </div>
  </section>
);

/**
 * Post event card
 */
const PostEventCard = (props: { user: User }): JSX.Element => {
  // If the user doesn't have the "post_event" permission, don't show the card
  if (!props.user.permissions.includes("post_event")) return <div className="h-80"></div>;

  return (
    <div className="mt-6 flex h-80 w-96 flex-col rounded-md bg-white p-4">
      <h1 className="text-2xl font-bold text-primary">Post an event</h1>
      <p className="mt-2 text-sm text-primary">
        Post an event to the company calendar
      </p>
      <input
        type="text"
        placeholder="Event title"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <input
        type="text"
        placeholder="Event description"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <input
        type="text"
        placeholder="Event date"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <button
        className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
        onClick={() => alert("Not implemented")}
      >
        Post
      </button>
    </div>
  );
};

/**
 * Lenders
 */
const Lenders = (): JSX.Element => (
  <section id="lenders" className="flex h-96 w-full flex-col bg-white p-7">
    <h1 className="text-4xl font-bold text-primary">Lenders</h1>
    <p className="mt-2 text-sm text-primary">
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

/**
 * Fetch the news
 */
const fetchArticles = async (): Promise<any> => {
  return await fetch("/api/news")
    .then((res) => res.json())
    .then((data) => data);
};
