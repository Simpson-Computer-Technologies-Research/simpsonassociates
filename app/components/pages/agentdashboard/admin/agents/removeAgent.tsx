"use client";

import React from "react";
import { Agent, SetState, User } from "@/app/lib/types";
import { generateAuthorization } from "@/app/lib/auth";
import { ObjectState } from "@/app/lib/state";

/**
 * Remove Agent Button
 * @param props the props of the button
 * @returns JSX.Element
 */
interface RemoveAgentButtonProps {
  user: User;
  agent: Agent;
  agents: ObjectState<Agent[]>;
}
export default function RemoveAgentButton(
  props: RemoveAgentButtonProps,
): JSX.Element {
  if (!props.agent) return <></>;

  const [confirmation, setConfirmation] = React.useState<boolean>(false);

  return confirmation ? (
    <RemoveConfirmation setConfirmation={setConfirmation} {...props} />
  ) : (
    <button
      className="rounded-md bg-white px-10 py-2 font-medium text-primary"
      onClick={() => setConfirmation(true)}
    >
      Remove
    </button>
  );
}

/**
 * Remove Confirmation
 * @param props the props of the confirmation
 * @returns JSX.Element
 */
interface RemoveConfirmationProps {
  setConfirmation: SetState<boolean>;
  agents: ObjectState<Agent[]>;
  user: User;
  agent: Agent;
}
const RemoveConfirmation = (props: RemoveConfirmationProps): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-center">
      <p className="mr-4 text-lg font-medium text-white">Are you sure?</p>
      <div className="flex flex-row items-center justify-between">
        <button
          onClick={async () => {
            props.setConfirmation(false);

            const result = await removeAgent(
              props.user.accessToken || "",
              props.user.email || "",
              props.agent.user_id,
            );

            if (result) {
              const filteredAgents = props.agents.value.filter((agent) => {
                if (agent !== props.agent) return agent;
              });
              props.agents.set(filteredAgents);
            }
          }}
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
        >
          Yes
        </button>
        <button
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
          onClick={() => props.setConfirmation(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/**
 * Remove Agent via api
 * @returns boolean for success/failure
 */
const removeAgent = async (
  accessToken: string,
  accessEmail: string,
  user_id: string,
): Promise<boolean> => {
  if (!accessToken || !accessEmail || !user_id) {
    return false;
  }

  // Generate a new authorization token
  const authorization = await generateAuthorization(accessToken, accessEmail);

  // Remove the agent
  return await fetch("/api/agents", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      user_id,
    }),
  })
    .then((res) => res.json())
    .then((json) => json && json.result && json.result.acknowledged)
    .catch((_: Error) => false);
};
