"use client";
import { useEffect, useState } from "react";
import { User, Event } from "@/lib/types";

import SideMenu from "@/app/components/pages/agentdashboard/sideMenu";
import PostEventCard from "@/app/components/pages/agentdashboard/postEventCard";
import { generateAuthorization } from "@/lib/auth";
import { ObjectState } from "@/lib/state";
import { epochToDate } from "@/lib/date";
import { isSuccess } from "@/lib/http";

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
      </div>
    </section>
  );
}

/**
 * Events section
 * @returns JSX.Element
 */
const Events = (props: { user: User }): JSX.Element => {
  const events = new ObjectState<Event[] | null>(null);

  useEffect(() => {
    if (events.value) return;

    generateAuthorization(props.user.accessToken, props.user.email).then(
      async (auth: string) => {
        const result: Event[] = await fetchEvents(auth);
        if (result && result.length) {
          events.set(result.sort((a, b) => b.date - a.date));
        }
      },
    );
  }, [props.user]);

  return (
    <section id="events" className="flex h-fit w-full flex-col bg-primary p-7">
      <h1 className="text-4xl font-bold text-white">Events</h1>
      <p className="mt-2 text-sm text-white">
        Keep up with upcoming company events and meetings
      </p>
      <PostEventCard user={props.user} events={events} />
      <div className="flex flex-wrap gap-4 lg:grid lg:grid-cols-2">
        {events.value &&
          events.value.map((event: any) => (
            <EventCard user={props.user} event={event} events={events} />
          ))}
      </div>
    </section>
  );
};

/**
 * Event card
 */
const EventCard = (props: {
  user: User;
  event: Event;
  events: ObjectState<Event[] | null>;
}): JSX.Element => {
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div className="mb-4 mt-6 flex h-auto w-full flex-col rounded-md bg-white p-4">
      <h1 className="text-2xl font-bold text-primary">{props.event.title}</h1>
      <p className="mt-2 text-sm text-primary">{props.event.description}</p>
      <p className="mt-2 text-sm font-bold tracking-wide text-primary">
        {epochToDate(props.event.date)}
      </p>
      <p className="mt-2 text-sm text-primary">Note: {props.event.note}</p>
      <p className="mt-2 text-sm text-primary">
        Posted by: {props.event.posted_by}
      </p>
      <button
        disabled={disabled}
        hidden={!props.user.permissions.includes("manage_events")}
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110 disabled:opacity-50"
        onClick={async () => {
          const eventId: string = props.event.event_id || "";
          if (!eventId) return;

          const events: Event[] = props.events.value || [];
          if (!events.length) return;
          setDisabled(true);

          const result: boolean = await deleteEvent(props.user, eventId);
          setDisabled(false);

          if (!result || !props.event.event_id) return;
          props.events.set(filterEvents(events, eventId));
        }}
      >
        Delete
      </button>
    </div>
  );
};

/**
 * Filter events
 * @param events
 * @param event_id
 */
const filterEvents = (events: Event[], event_id: string): Event[] => {
  return events.filter((event) => event.event_id !== event_id);
};

/**
 * Fetch events
 * @returns Promise<Event[]>
 */
const fetchEvents = async (authorization: string): Promise<Event[]> => {
  return fetch("/api/agents/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  })
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((_: Error) => []);
};

/**
 * Delete event
 * @param event_id
 * @param authorization
 */
const deleteEvent = async (user: User, event_id: string): Promise<boolean> => {
  const authorization: string = await generateAuthorization(
    user.accessToken,
    user.email,
  );

  return await fetch("/api/agents/events", {
    method: "DELETE",
    headers: {
      authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event_id }),
  })
    .then((res) => isSuccess(res.status))
    .catch((_: Error) => false);
};
