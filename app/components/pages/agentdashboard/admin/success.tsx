import React from "react";

import "@/app/styles/globals.css";

import { User, Agent } from "@/app/lib/types";

import AddAgent from "./addAgent/addAgent";
import Agents from "./agents/agents";
import SideMenu from "./adminSideMenu";
import UpdateAgent from "./addAgent/addAgent";

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
  const agentsRef: React.MutableRefObject<Agent[]> = React.useRef([]);

  if (!agentsRef.current.length) {
    fetchAgents().then((agents: any) => (agentsRef.current = agents));
  }

  return (
    <>
      <UpdateAgent user={props.user} agentsRef={agentsRef} />
      <Agents agentsRef={agentsRef} user={props.user} />
    </>
  );
}
