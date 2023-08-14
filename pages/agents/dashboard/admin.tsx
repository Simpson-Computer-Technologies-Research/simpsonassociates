"use client";

import React from "react";

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
      <ModifyAgents user={user} />
    </div>
  </div>
);

/**
 * Add Agents Section
 */
const ModifyAgents = (props: { user: User }): JSX.Element => {
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
        {/* Add Agent */}
        <div className="mt-4 flex flex-col rounded-md bg-white p-7">
          <p className="mb-4 text-2xl font-bold text-primary">Add Agent</p>
          <AddAgentInputs
            user={props.user}
            setAgents={setAgents}
            agents={agents}
          />
        </div>

        {/* Current Agents */}
        <div className="mt-4 flex flex-col rounded-md bg-white p-7">
          <p className="text-2xl font-bold text-primary">Current Agents</p>
          <div className="flex h-full w-full flex-col">
            <CurrentAgents
              agents={agents}
              setAgents={setAgents}
              pendingModification={pendingModification}
              setPendingModification={setPendingModification}
            />
          </div>
        </div>

        {/* Modify Agent */}
        {pendingModification &&
          pendingModification.map((agent: any) => (
            <div className="mt-4 flex flex-col rounded-md bg-white p-7">
              <p className="mb-4 text-2xl font-bold text-primary">
                Modify Agent
              </p>
              <ModifyAgentInputs
                pendingModification={pendingModification}
                setPendingModification={setPendingModification}
                agent={agent}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

/**
 * Current agents
 */
const CurrentAgents = (props: {
  agents: any;
  setAgents: any;
  pendingModification: any;
  setPendingModification: any;
}): JSX.Element => {
  return (
    <>
      {props.agents &&
        props.agents.map((agent: any) => (
          <div className="flex h-16 w-full flex-row items-center justify-between px-4">
            <p className="text-lg font-medium text-primary">{agent.name}</p>
            <div className="flex flex-row gap-4">
              <RemoveAgentButton
                setAgents={props.setAgents}
                agents={props.agents}
              />
              <div></div>
              <button
                className="rounded-md bg-primary px-2 py-2 font-medium text-white"
                onClick={() => {
                  // If the agent is already pending modification, return
                  if (props.pendingModification.includes(agent)) return;
                  props.setPendingModification([
                    ...props.pendingModification,
                    agent,
                  ]);
                }}
              >
                Modify
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

/**
 * Input for the modify agent section
 * ph: placeholder
 * id: id
 * def: default value
 */
const Input = (props: { ph: string; id: string; def: string }): JSX.Element => (
  <input
    id={props.id}
    type="text"
    className="w-auto rounded-md border-2 border-primary px-2 py-2"
    placeholder={props.ph}
    defaultValue={props.def}
  />
);

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
      <Input ph="Name" id="modify_name" def={props.agent.name} />
      <Input ph="Email" id="modify_email" def={props.agent.email} />
      <Input ph="Title" id="modify_title" def={props.agent.title} />
      <Input ph="Level" id="modify_level" def={props.agent.level} />
      <Input ph="Languages" id="modify_languages" def={props.agent.lang} />
      <Input ph="License" id="modify_license" def={props.agent.license} />

      {/* Permissions checklist */}
      <div
        id="modify_permissions"
        className="flex h-full w-full flex-col gap-2"
      >
        <p className="text-lg font-medium text-primary">Permissions</p>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            value="post_events"
            className="h-4 w-4"
            checked={
              props.agent.permissions &&
              props.agent.permissions.includes("post_events")
            }
          />
          <label htmlFor="post_events">Post Events</label>
        </div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            value="admin"
            className="h-4 w-4"
            checked={
              props.agent.permissions &&
              props.agent.permissions.includes("admin")
            }
          />
          <label htmlFor="admin">Admin</label>
        </div>
      </div>
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
const AddAgentInputs = (props: {
  user: User;
  setAgents: any;
  agents: any;
}): JSX.Element => {
  const [error, setError] = React.useState<string>("");

  return (
    <>
      <div className="grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Input ph="Name" id="add_name" def="" />
        <Input ph="Email" id="add_email" def="" />
        <Input ph="Title" id="add_title" def="" />
        <Input ph="Level" id="add_level" def="" />
        <Input ph="Languages" id="add_languages" def="" />
        <Input ph="License" id="add_license" def="" />

        {/* Permissions checklist */}
        <div id="add_permissions" className="flex h-full w-full flex-col gap-2">
          <p className="text-lg font-medium text-primary">Permissions</p>
          <div className="flex flex-row gap-2">
            <input type="checkbox" value="post_events" className="h-4 w-4" />
            <label htmlFor="post_events">Post Events</label>
          </div>
          <div className="flex flex-row gap-2">
            <input type="checkbox" value="admin" className="h-4 w-4" />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
      </div>
      <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
        Select Region
      </button>
      <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
        Upload Photo
      </button>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => {
            const inputs = getInputs();
            if (inputs.error) {
              setError(inputs.error);
              return;
            }
            addAgent(inputs, props.user.accessToken as string).then((res) => {
              if (res) {
                clearAddAgent();
                props.setAgents([...props.agents, inputs]);
              }
            });
          }}
          className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
        >
          Add
        </button>
        <button
          onClick={clearAddAgent}
          className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
        >
          Clear
        </button>
      </div>
      {error && (
        <p className="mt-4 text-lg font-medium text-primary">{error}</p>
      )}
    </>
  );
};
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

/**
 * Clear the add agent inputs
 */
function clearAddAgent(): void {
  const inputs = document.querySelectorAll(
    "#add_name, #add_email, #add_title, #add_level, #add_languages, #add_license",
  );
  inputs.forEach((input) => ((input as HTMLInputElement).value = ""));

  // Clear the permissions checklist
  const add_permissions = document.getElementById(
    "add_permissions",
  ) as HTMLInputElement;
  for (let i = 0; i < add_permissions.children.length; i++) {
    const child = add_permissions.children[i] as HTMLInputElement;
    child.checked = false;
  }
}

/**
 * Fetch the agents
 */
const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
};

/**
 * Add an agent
 */
const addAgent = async (
  input: {
    name: string;
    email: string;
    title: string;
    level: string;
    lang: string;
    license: string;
    photo: string;
    permissions: string[];
  },
  authorization: string,
) => {
  return await fetch("/api/agents", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({ ...input }),
  })
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
};

/**
 * Get the inputs
 */
const getInputs = (): any => {
  const name = (document.getElementById("add_name") as HTMLInputElement).value;
  if (!name) return { error: "Name is required" };
  const email = (document.getElementById("add_email") as HTMLInputElement)
    .value;
  if (!email) return { error: "Email is required" };
  const title = (document.getElementById("add_title") as HTMLInputElement)
    .value;
  if (!title) return { error: "Title is required" };
  const level = (document.getElementById("add_level") as HTMLInputElement)
    .value;
  if (!level) return { error: "Level is required" };
  const lang = (document.getElementById("add_languages") as HTMLInputElement)
    .value;
  if (!lang) return { error: "Languages is required" };
  const license = (document.getElementById("add_license") as HTMLInputElement)
    .value;
  if (!license) return { error: "License is required" };

  // get the permissions from the add_permissions checklist
  const permissions = ["agent"];
  const add_permissions = document.getElementById(
    "add_permissions",
  ) as HTMLInputElement;
  for (let i = 0; i < add_permissions.children.length; i++) {
    const child = add_permissions.children[i] as HTMLInputElement;
    if (child.checked) permissions.push(child.value);
  }

  const photo = "/images/default_agent_headshot.png";
  const region = {
    location: "Kitchener ON",
    lat: 43.45,
    long: -80.48,
  };
  return {
    name,
    email,
    title,
    level,
    lang,
    license,
    photo,
    region,
    permissions,
  };
};
