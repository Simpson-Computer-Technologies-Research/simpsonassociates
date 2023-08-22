"use client";
import { User, Agent } from "@/lib/types";

import RemoveAgentButton from "./removeAgent";
import { ObjectState } from "@/lib/state";

/**
 * Current Agents
 * @param props
 * @returns JSX.Element
 */
interface AgentsProps {
  agents: ObjectState<Agent[]>;
  user: User;
}
export default function Agents(props: AgentsProps): JSX.Element {
  return (
    <section
      id="current-agents"
      className="flex h-fit w-full flex-col bg-white p-7"
    >
      <h1 className="text-4xl font-bold text-primary">Agents</h1>
      <p className="my-2 text-sm text-primary">
        Remove agents from the list below.
      </p>
      <div className="flex flex-col gap-4">
        {props.agents.value.map((agent: Agent, i: number) => (
          <AgentCard
            key={i}
            agent={agent}
            user={props.user}
            agents={props.agents}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Agent Card
 * @param props the props of the card
 * @returns JSX.Element
 */
interface AgentCardProps {
  agent: Agent;
  user: User;
  agents: ObjectState<Agent[]>;
}
const AgentCard = (props: AgentCardProps): JSX.Element => {
  return (
    <div className="flex h-24 w-full flex-row items-center justify-between rounded-md bg-primary">
      <div className="flex h-full w-full flex-row items-center justify-between px-4">
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-medium text-white">{props.agent.name}</p>
          <p className="text-sm font-medium text-white">{props.agent.email}</p>
        </div>
        <RemoveAgentButton {...props} />
      </div>
    </div>
  );
};
