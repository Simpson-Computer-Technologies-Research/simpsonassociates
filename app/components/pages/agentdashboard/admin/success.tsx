"use client";
import "@/app/styles/globals.css";

import { User, Agent } from "@/app/lib/types";

import Agents from "./agents/agents";
import SideMenu from "./adminSideMenu";
import UpdateAgent from "./addAgent/addAgent";
import { ObjectState } from "@/app/lib/state";
import { isSuccess } from "@/app/lib/http";

/**
 * Fetch the agents
 * @returns Promise<any>
 */
const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => (isSuccess(res.status) ? res.json() : { result: [] }))
    .then((json) => json.result)
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

  if (!agents.value.length) {
    fetchAgents().then((result: Agent[]) => agents.set(result));
  }

  return (
    <>
      <UpdateAgent user={props.user} agents={agents} />
      <Agents agents={agents} user={props.user} />
    </>
  );
}
