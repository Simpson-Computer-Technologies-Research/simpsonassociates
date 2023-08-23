"use client";
import "@/app/styles/globals.css";

import { User, Agent } from "@/lib/types";

import Agents from "./agents/agents";
import SideMenu from "./adminSideMenu";
import AddAgent from "./addAgent/addAgent";
import { ObjectState } from "@/lib/state";

/**
 * Fetch the agents
 * @returns Promise<any>
 */
const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => res.json())
    .then((json) => json.result || [])
    .catch((_: Error) => []);
};

/**
 * Success section
 * @returns JSX.Element
 */
export default function Success(user: User): JSX.Element {
  return (
    <div>
      <SideMenu user={user} />
      <div className="relative sm:ml-64">
        <_Success user={user} />
      </div>
    </div>
  );
}

/**
 * Agents section
 * @param agents
 * @returns JSX.Element
 */
function _Success(props: { user: User }): JSX.Element {
  const agents = new ObjectState<Agent[]>([]);

  if (!agents.updated) {
    fetchAgents().then((result: Agent[]) => {
      if (result.length) agents.set(result);
    });
  }

  return (
    <>
      <AddAgent user={props.user} agents={agents} />
      <Agents agents={agents} user={props.user} />
    </>
  );
}
