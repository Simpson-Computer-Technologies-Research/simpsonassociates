import React from "react";

import { User, Event } from "@/app/lib/types";

import SideMenu from "@/app/components/pages/agentdashboard/sideMenu";
import PostEventCard from "@/app/components/pages/agentdashboard/postEventCard";
import { generateAuthorization } from "@/app/lib/auth";
import { LoadingRelative } from "../../loading";

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
  const [events, setEvents] = React.useState<Event[] | null>(null);
  React.useEffect(() => {
    if (!events && props.user.accessToken && props.user.email) {
      generateAuthorization(props.user.accessToken, props.user.email).then(
        (authorization: string) => {
          fetch("/api/events", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization,
            },
          })
            .then((res) => res.json())
            .then((json) => {
              if (json && json.result) setEvents(json.result);
            });
        },
      );
    }
  }, []);

  if (!events) return <LoadingRelative />;

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
      <p className="mt-2 text-sm text-primary">Note: {props.event.note}</p>
      <p className="mt-2 text-sm text-primary">{props.event.posted_by}</p>
      <button
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110"
        onClick={() => alert("Not implemented")}
      >
        Delete
      </button>
    </div>
  );
};
