import React from "react";

import { User, Event } from "@/app/lib/types";

import SideMenu from "@/app/components/pages/agentdashboard/sideMenu";
import PostEventCard from "@/app/components/pages/agentdashboard/postEventCard";

/**
 * Success section
 * @returns JSX.Element
 */
export default function Success(user: User): JSX.Element {
  return (
    <section className="flex flex-col">
      <SideMenu user={user} />
      <div className="relative sm:ml-64">
        <Events user={user} />
        <Lenders />
      </div>
    </section>
  );
}

/**
 * Events section
 * @returns JSX.Element
 */
const Events = (props: { user: User }): JSX.Element => {
  const [events, setEvents] = React.useState<Event[]>([]);
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
 * Event card
 */
const EventCard = (props: { event: Event }): JSX.Element => {
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
