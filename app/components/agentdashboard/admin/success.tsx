import React from "react";

import { User } from "@/pages/agents/middleware";
import { signOut } from "next-auth/react";

import AddAgent from "./addAgent";
import CurrentAndModifyAgents from "./currentAgents";
import SideMenu from "./sideMenu";

import "@/app/styles/globals.css";

/**
 * Fetch the agents
 */
const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
};

/**
 * Success section
 */
export default function Success(user: User): JSX.Element {
  return (
    <div>
      <SideMenu user={user} />
      <div className="relative sm:ml-64">
        <Agents user={user} />
      </div>
    </div>
  );
}

/**
 * Agents section
 * @param agents
 * @returns JSX.Element
 */
function Agents(props: { user: User }): JSX.Element {
  // Fetch the current agents
  const [agents, setAgents] = React.useState<any>(null);
  if (agents === null) {
    fetchAgents().then((agents: any) => setAgents(agents));
  }

  return (
    <>
      <AddAgent user={props.user} agents={agents} setAgents={setAgents} />
      <CurrentAndModifyAgents agents={agents} setAgents={setAgents} />
    </>
  );
}
