"use client";
import { useState } from "react";
import { User } from "@/lib/types";
import { generateAuthorization } from "@/lib/auth";
import { Event } from "@/lib/types";
import { ObjectState } from "@/lib/state";
import { isSuccess } from "@/lib/http";

/**
 * Post event card
 * @param props
 * @returns JSX.Element
 */
export default function PostEventCard(props: {
  user: User;
  events: ObjectState<Event[] | null>;
}): JSX.Element {
  if (!props.user.permissions.includes("manage_events")) return <></>;
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div className="mb-4 mt-6 flex h-auto w-auto flex-col rounded-md bg-white p-4">
      <h1 className="text-2xl font-bold text-primary">Post an event</h1>
      <p className="mt-2 text-sm text-primary">
        Post an event to the company calendar
      </p>
      <input
        id="title"
        type="text"
        placeholder="Event title"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <input
        id="description"
        type="text"
        placeholder="Event description/location"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <input
        id="date"
        type="datetime-local"
        placeholder="Event date"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <textarea
        id="note"
        placeholder="Extra Notes"
        className="mt-4 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-primary"
      />
      <div className="mt-3 flex flex-row gap-2 text-primary">
        <input
          id="notify_agents"
          type="checkbox"
          value="notify_agents"
          className="h-6 w-6"
        />
        <label htmlFor="notify_agents">Notify Agents</label>
      </div>

      <button
        disabled={disabled}
        className="mt-4 rounded-md bg-primary px-10 py-2.5 text-sm font-medium text-white hover:brightness-110 disabled:opacity-50"
        onClick={async () => {
          setDisabled(true);
          const result = await createEvent(props.user);

          setDisabled(false);

          if (!result) return;

          const values: Event = getInputValues(props.user);
          props.events.set([...(props.events.value || []), values]);
        }}
      >
        Post
      </button>
    </div>
  );
}

/**
 * Create a new event and add the event info to the database via the api
 * @param user The user who's making the event post
 */
const createEvent = async (user: User): Promise<boolean> => {
  const authorization: string = await generateAuthorization(
    user.accessToken || "",
    user.email || "",
  );

  const body = getInputValues(user);
  return await fetch("/api/agents/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify(body),
  })
    .then((res) => isSuccess(res.status))
    .catch((_: Error) => false);
};

/**
 * Get the inputted values using document.getElementById
 * @param user The user who's posting the event
 * @returns the input map for the api request body
 */
const getInputValues = (user: User): Event => {
  const title: string = (document.getElementById("title") as HTMLInputElement)
    .value;

  const description: string = (
    document.getElementById("description") as HTMLInputElement
  ).value;

  const date: string = (document.getElementById("date") as HTMLInputElement)
    .value;

  const note: string = (document.getElementById("note") as HTMLInputElement)
    .value;

  const notify_agents: boolean = (
    document.getElementById("notify_agents") as HTMLInputElement
  ).checked;

  const dateNumber: number = new Date(date).getTime();

  return {
    title,
    notify_agents,
    description,
    date: dateNumber,
    note,
    posted_by: user.email || "",
  };
};
