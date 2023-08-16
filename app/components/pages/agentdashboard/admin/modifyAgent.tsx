import React from "react";
import Input from "./input";
import { SetState, Agent } from "@/app/lib/types";

/**
 * Modify agent card
 */
export default function ModifyAgentCard(props: {
  agent: Agent;
  setModify: SetState<boolean>;
}): JSX.Element {
  return (
    <div className="my-4 flex flex-col border-b-4 border-b-primary bg-white pb-7">
      <p className="mb-4 text-2xl font-bold text-primary">
        Modifying {props.agent.name}
      </p>
      <div className="grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ModInputs agent={props.agent} />
        <PermissionsChecklist agent={props.agent} />
      </div>
      <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
        Select Region
      </button>
      <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
        Upload Photo
      </button>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => updateAgent()}
          className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
        >
          Save
        </button>
        <button
          onClick={() => props.setModify(false)}
          className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/**
 * Modify Agent Inputs
 * @param props the props of the inputs
 * @returns JSX.Element
 */
const ModInputs = (props: { agent: Agent }): JSX.Element => (
  <>
    <Input placeholder="Name" id="modify_name" default={props.agent.name} />
    <Input placeholder="Email" id="modify_email" default={props.agent.email} />
    <Input placeholder="Title" id="modify_title" default={props.agent.title} />
    <Input placeholder="Level" id="modify_level" default={props.agent.level} />
    <Input
      placeholder="Languages"
      id="modify_languages"
      default={props.agent.lang}
    />
    <Input
      placeholder="License"
      id="modify_license"
      default={props.agent.license}
    />
  </>
);

/**
 * Permissions Checklist
 * @returns JSX.Element
 */
const PermissionsChecklist = (props: { agent: Agent }): JSX.Element => (
  <div id="modify_permissions" className="flex h-full w-full flex-col gap-2">
    <p className="text-lg font-medium text-primary">Permissions</p>
    <PermissionsCheckbox
      value="post_events"
      agent={props.agent}
      text="Post Events"
    />
    <PermissionsCheckbox value="admin" agent={props.agent} text="Admin" />
  </div>
);

/**
 * Permissions Checkbox
 * @returns JSX.Element
 */
const PermissionsCheckbox = (props: {
  value: string;
  text: string;
  agent: Agent;
}): JSX.Element => (
  <div className="flex flex-row gap-2">
    <input
      type="checkbox"
      value={props.value}
      className="h-4 w-4"
      checked={
        props.agent &&
        props.agent.permissions &&
        props.agent.permissions.includes(props.value)
      }
    />
    <label htmlFor={props.value}>{props.text}</label>
  </div>
);

/**
 * Send an http request to the api to update an agent
 * @param agent the agent to update
 * @returns void
 */
const updateAgent = (): void => {};
