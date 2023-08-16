import React from "react";

import { User, Agent } from "@/app/lib/types";
import AddAgent from "./addAgent";
import Agents from "./allAgents";
import SideMenu from "./sideMenu";

import "@/app/styles/globals.css";

/**
 * Fetch the agents
 * @returns Promise<any>
 */
const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
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
  // Fetch the current agents
  const [agents, setAgents] = React.useState<Agent[]>([]);
  if (!agents || agents.length === 0) {
    fetchAgents().then((agents: any) => setAgents(agents));
  }

  return (
    <>
      <AddAgent user={props.user} agents={agents || []} setAgents={setAgents} />
      <Agents agents={agents || []} setAgents={setAgents} user={props.user} />
    </>
  );
}
