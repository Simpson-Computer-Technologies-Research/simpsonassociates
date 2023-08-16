import React from "react";
import ModifyAgentCard from "./modifyAgent";
import RemoveAgentButton from "./removeAgent";
import { SetState, User, Agent } from "@/app/lib/types";

/**
 * Current Agents and Modify Agents
 * @param props
 * @returns JSX.Element
 */
export default function Agents(props: {
  agents: Agent[];
  user: User;
  setAgents: SetState<Agent[]>;
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
const AgentCard = (props: {
  agent: Agent;
  user: User;
  setAgents: SetState<Agent[]>;
  setModify: SetState<boolean>;
}): JSX.Element => {
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
