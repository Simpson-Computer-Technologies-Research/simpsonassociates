"use client";

import React from "react";
import { fetchAgents } from "@/lib/agents";

import PermissionMiddleware, { User } from "@/pages/agents/middleware";
import { signOut } from "next-auth/react";

import "@/styles/globals.css";

/**
 * Dashboard page
 * @returns {JSX.Element} JSX.Element
 */
export default function AdminDashboard(): JSX.Element {
  return (
    <PermissionMiddleware
      permissions={["agent", "admin"]}
      success={Success}
      unauthorized={Unauthorized}
    />
  );
}

/**
 * Success section
 */
const Success = (user: User): JSX.Element => (
  <div>
    <SideMenu user={user} />
    <div className="relative sm:ml-64">
      <ModifyAgents />
    </div>
  </div>
);

/**
 * Add Agents Section
 */
const ModifyAgents = (): JSX.Element => {
  // Fetch the current agents
  const [agents, setAgents] = React.useState<any>(null);
  if (agents === null) {
    fetchAgents().then((agents: any) => setAgents(agents));
  }

  // Modify state
  const [pendingModification, setPendingModification] = React.useState<any>([]);

  // Return the jsx
  return (
    <section className="flex h-fit w-full flex-col bg-primary px-10 pb-10 pt-7">
      <p className="text-4xl font-bold text-white">Modify Agents</p>
      <div className="mt-4 flex flex-col rounded-md bg-white p-7">
        {/* Current Agents */}
        <p className="text-2xl font-bold text-primary">Current Agents</p>
        <div className="flex h-full w-full flex-col">
          {agents &&
            agents.map((agent: any) => (
              <div className="flex h-16 w-full flex-row items-center justify-between px-4">
                <p className="text-lg font-medium text-primary">{agent.name}</p>
                <div className="flex flex-row gap-4">
                  <RemoveAgentButton setAgents={setAgents} agents={agents} />
                  <button
                    className="rounded-md bg-primary px-2 py-2 font-medium text-white"
                    onClick={() => {
                      // If the agent is already pending modification, return
                      if (pendingModification.includes(agent)) return;
                      setPendingModification([...pendingModification, agent]);
                    }}
                  >
                    Modify
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modify Agent */}
      {pendingModification &&
        pendingModification.map((agent: any) => (
          <div className="mt-4 flex flex-col rounded-md bg-white p-7">
            <p className="mb-4 text-2xl font-bold text-primary">Modify Agent</p>
            <ModifyAgentInputs
              pendingModification={pendingModification}
              setPendingModification={setPendingModification}
              agent={agent}
            />
          </div>
        ))}

      {/* Add Agent */}
      <div className="mt-4 flex flex-col rounded-md bg-white p-7">
        <p className="mb-4 text-2xl font-bold text-primary">Add Agent</p>
        <AddAgentInputs />
      </div>
    </section>
  );
};

/**
 * Modify Agent Inputs
 */
const ModifyAgentInputs = (props: {
  pendingModification: any;
  setPendingModification: any;
  agent: any;
}): JSX.Element => (
  <>
    <div className="grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      <input
        id="modify_name"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Name"
        defaultValue={props.agent.name}
      />
      <input
        id="modify_email"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Email"
        defaultValue={props.agent.email}
      />
      <input
        id="modify_title"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Title"
        defaultValue={props.agent.title}
      />
      <input
        id="modify_level"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Level"
        defaultValue={props.agent.level}
      />
      <input
        id="modify_languages"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Languages"
        defaultValue={props.agent.lang}
      />
      <input
        id="modify_license"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="License"
        defaultValue={props.agent.license}
      />
    </div>
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Select Region
    </button>
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Upload Photo
    </button>
    <div className="flex flex-row gap-4">
      <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
        Save
      </button>
      <button
        onClick={() =>
          props.setPendingModification(props.pendingModification.slice(1))
        }
        className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
      >
        Cancel
      </button>
    </div>
  </>
);

/**
 * Add Agent Inputs
 */
const AddAgentInputs = (): JSX.Element => (
  <>
    <div className="grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      <input
        id="add_name"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Name"
      />
      <input
        id="add_email"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Email"
      />
      <input
        id="add_title"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Title"
      />
      <input
        id="add_level"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Level"
      />
      <input
        id="add_languages"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="Languages"
      />
      <input
        id="add_license"
        type="text"
        className="w-auto rounded-md border-2 border-primary px-2 py-2"
        placeholder="License"
      />
    </div>
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Select Region
    </button>
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Upload Photo
    </button>
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Add
    </button>
  </>
);

/**
 * Remove Agent Button
 */
const RemoveAgentButton = (props: {
  agents: any;
  setAgents: any;
}): JSX.Element => {
  const [confirm, setConfirm] = React.useState<boolean>(false);

  return confirm ? (
    <div className="flex flex-row items-center justify-between">
      <p className="mr-4 text-lg font-medium text-primary">Are you sure?</p>
      <div className="flex flex-row items-center justify-between">
        <button
          className="mx-2 rounded-md bg-primary px-6 py-2 font-medium text-white"
          onClick={() => setConfirm(false)}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setConfirm(false);
            props.setAgents(props.agents.slice(1));
          }}
          className="mx-2 rounded-md bg-primary px-6 py-2 font-medium text-white"
        >
          Yes
        </button>
      </div>
    </div>
  ) : (
    <button
      className="rounded-md bg-primary px-2 py-2 font-medium text-white"
      onClick={() => setConfirm(true)}
    >
      Remove
    </button>
  );
};

/**
 * Not an agent section
 */
const Unauthorized = (): JSX.Element => (
  <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
    <p className="text-4xl font-bold text-white">
      You are not an administrative agent
    </p>
    <button
      className="mt-4 rounded-md bg-white px-10 py-2.5 font-medium text-primary"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  </section>
);

function SideMenu(props: { user: User }): JSX.Element {
  return (
    <div className="z-10 flex h-auto w-screen flex-col bg-slate-50 p-4 sm:fixed sm:h-screen sm:w-64">
      <div className="flex flex-row items-center justify-start">
        <img
          src={props.user.image || "/images/default_agent_headshot.png"}
          alt="..."
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="ml-4 text-3xl font-bold text-primary">Agent</p>
      </div>
      <p className="mb-1 mt-3 text-sm font-medium text-primary/80">
        Welcome, {props.user.name}
      </p>
      <p className="mb-2 text-xs font-medium text-primary/50">
        {props.user.email}
      </p>
      <a
        href="/agents/dashboard/#events"
        className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
      >
        Events
      </a>
      <a
        href="/agents/dashboard/#lenders"
        className="mt-4 rounded-md bg-primary px-10 py-2.5 font-medium text-white hover:brightness-110"
      >
        Lenders
      </a>
      <button
        onClick={() => signOut()}
        className="relative bottom-4 mt-8 rounded-md bg-primary px-10 py-2.5 text-start font-medium text-white hover:brightness-110 sm:absolute"
      >
        Sign out
      </button>
    </div>
  );
}
