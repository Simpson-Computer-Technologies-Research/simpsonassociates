import React from "react";
import ModifyAgentCard from "./modifyAgent";
import { generateBearer } from "@/app/lib/bearer";

/**
 * Current Agents and Modify Agents
 * @param props
 * @returns JSX.Element
 */
export default function Agents(props: {
  agents: any;
  user: any;
  setAgents: any;
}): JSX.Element {
  return (
    <section
      id="current-agents"
      className="flex h-fit w-full flex-col bg-white p-7"
    >
      <h1 className="text-4xl font-bold text-primary">All Agents</h1>
      <p className="mt-2 text-sm text-primary">
        Modify or remove agents from the list below.
      </p>
      <div className="flex h-full w-full flex-col">
        {props.agents &&
          props.agents.map((agent: any, i: number) => {
            const [modify, setModify] = React.useState<boolean>(false);
            return (
              <div key={i}>
                {modify ? (
                  <ModifyAgentCard agent={agent} setModify={setModify} />
                ) : (
                  <AgentCard {...props} agent={agent} setModify={setModify} />
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

/**
 * Agent Card
 * @param props the props of the card
 * @returns JSX.Element
 */
const AgentCard = (props: any): JSX.Element => {
  return (
    <div className="my-4 flex h-24 w-full flex-row items-center justify-between rounded-md bg-primary">
      <div className="flex h-full w-full flex-row items-center justify-between px-4">
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-medium text-white">{props.agent.name}</p>
          <p className="text-sm font-medium text-white">{props.agent.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <RemoveAgentButton {...props} />
          <button
            className="mx-2 rounded-md bg-white px-6 py-2 font-medium text-primary"
            onClick={() => props.setModify(true)}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Remove Agent Button
 * @param props the props of the button
 * @returns JSX.Element
 */
const RemoveAgentButton = (props: any): JSX.Element => {
  const [confirm, setConfirm] = React.useState<boolean>(false);

  return confirm ? (
    <RemoveConfirmation setConfirm={setConfirm} {...props} />
  ) : (
    <button
      className="rounded-md bg-white px-10 py-2 font-medium text-primary"
      onClick={() => setConfirm(true)}
    >
      Remove
    </button>
  );
};

/**
 * Remove Confirmation
 * @param props the props of the confirmation
 * @returns JSX.Element
 */
const RemoveConfirmation = (props: any): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-center">
      <p className="mr-4 text-lg font-medium text-white">Are you sure?</p>
      <div className="flex flex-row items-center justify-between">
        <button
          onClick={async () => {
            props.setConfirm(false);
            await removeAgent(props.user.email, props.agent.email);
          }}
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
        >
          Yes
        </button>
        <button
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
          onClick={() => props.setConfirm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/**
 * Remove Agent via api
 * @param email the email of the agent to remove
 * @returns void
 */
const removeAgent = async (
  userEmail: string,
  email: string,
): Promise<boolean> => {
  // Generate the authorization token
  const authorization = await generateBearer(userEmail);

  // Remove the agent
  return await fetch("/api/agents", {
    method: "DELETE",
    headers: { authorization, email, "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json && json.result && json.result.deletedCount === 1);
};
