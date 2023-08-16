import React from "react";
import { User } from "@/pages/agents/dashboard/middleware";

/**
 * Post event card
 */
export default function PostEventCard(props: { user: User }): JSX.Element {
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