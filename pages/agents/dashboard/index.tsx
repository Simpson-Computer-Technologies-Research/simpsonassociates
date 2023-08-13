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
    <div className="relative sm:ml-64">
      <Events user={user} />
      <Lenders />
    </div>
  </section>
);

/**
 * Events section
 */
const Events = (props: { user: User }): JSX.Element => {
  const [events, setEvents] = React.useState<any>([]);
  if (events.length === 0) {
    setEvents([
      {
        title: "Event 1",
        description: "This is the first event",
        date: "2021-10-10",
        attending: 10,
      },
      {
        title: "Event 2",
        description: "This is the second event",
        date: "2021-10-10",
        attending: 10,
      },
    ]);
  }

  return (
    <section id="events" className="flex h-fit w-full flex-col bg-primary p-7">
      <h1 className="text-4xl font-bold text-white">Events</h1>
      <p className="mt-2 text-sm text-white">
        Keep up with upcoming company events and meetings
      </p>
      <PostEventCard user={props.user} />
      <div className="flex flex-wrap gap-4 lg:grid lg:grid-cols-2">
        {events.map((event: any) => (
          <EventCard event={event} />
        ))}
      </div>
    </section>
  );
};

/**
 * Post event card
 */
const PostEventCard = (props: { user: User }): JSX.Element => {
  // If the user doesn't have the "post_event" permission, don't show the card
  if (!props.user.permissions.includes("post_events")) return <></>;

  return (
    <div className="mb-4 mt-6 flex h-auto w-auto flex-col rounded-md bg-white p-4">
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
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110"
        onClick={() => alert("Not implemented")}
      >
        Post
      </button>
    </div>
  );
};

/**
 * Event card
 */
const EventCard = (props: { event: any }): JSX.Element => {
  return (
    <div className="mb-4 mt-6 flex h-auto w-full flex-col rounded-md bg-white p-4">
      <h1 className="text-2xl font-bold text-primary">{props.event.title}</h1>
      <p className="mt-2 text-sm text-primary">{props.event.description}</p>
      <p className="mt-2 text-sm text-primary">{props.event.date}</p>
      <button
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110"
        onClick={() => alert("Not implemented")}
      >
        Acknowledge Attendance
      </button>
      <button
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110"
        onClick={() => alert("Not implemented")}
      >
        See Attending ({props.event.attending})
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

function SideMenu(props: { user: User }): JSX.Element {
  return (
    <div className="z-10 flex h-auto w-screen flex-col bg-slate-50 p-4 sm:fixed sm:h-screen sm:w-64">
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
        className="relative bottom-4 mt-8 rounded-md bg-primary px-10 py-2.5 text-start font-medium text-white hover:brightness-110 sm:absolute"
      >
        Sign out
      </button>
    </div>
  );
}
