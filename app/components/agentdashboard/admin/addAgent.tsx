import { User } from "@/pages/agents/middleware";
import React from "react";
import Input from "./input";

/**
 * Add Agent Component
 * @param props
 * @returns JSX.Element
 */
export default function AddAgent(props: {
  user: User;
  setAgents: any;
  agents: any[];
}): JSX.Element {
  const [error, setError] = React.useState<string>("");

  // Eeturn the component jsx
  return (
    <div className="mt-4 flex flex-col rounded-md bg-white p-7">
      <p className="mb-4 text-2xl font-bold text-primary">Add Agent</p>
      <div className="grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AgentInfoInputs />
        <PermissionsChecklist />
      </div>
      <SelectRegionButton />
      <UploadPhotoButton />
      <div className="flex flex-row gap-4">
        <AddAgentButton {...props} setError={setError} />
        <ClearInputButton />
      </div>
      <p className="mt-4 text-lg font-medium text-primary">{error}</p>
    </div>
  );
}

/**
 * Add an agent
 * @param setError
 * @param setAgents
 * @param user
 * @param agents
 * @returns void
 */
const addAgent = (setError: any, setAgents: any, user: User, agents: any[]) => {
  // Get the agent info
  const agentInfo = getAgentInfo();

  // If there is an error, set the error and return
  if (agentInfo.error) return setError(agentInfo.error);

  // Put the agent
  putAgent(agentInfo, user.accessToken as string).then((res) => {
    if (res) {
      clearInput();
      setAgents([...agents, agentInfo]);
    }
  });
};

/**
 * Agent Info Inputs
 * @returns JSX.Element
 */
const AgentInfoInputs = (): JSX.Element => (
  <>
    <Input ph="Name" id="add_name" def="" />
    <Input ph="Email" id="add_email" def="" />
    <Input ph="Title" id="add_title" def="" />
    <Input ph="Level" id="add_level" def="" />
    <Input ph="Languages" id="add_languages" def="" />
    <Input ph="License" id="add_license" def="" />
  </>
);

/**
 * Permissions checklist
 * @returns JSX.Element
 */
const PermissionsChecklist = (): JSX.Element => (
  <div id="add_perms" className="flex h-full w-full flex-col gap-2">
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
);

/**
 * Add Agent Button
 * @param props
 * @returns JSX.Element
 */
const AddAgentButton = (props: {
  setError: any;
  setAgents: any;
  user: User;
  agents: any[];
}): JSX.Element => (
  <button
    onClick={() =>
      addAgent(props.setError, props.setAgents, props.user, props.agents)
    }
    className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
  >
    Add
  </button>
);

/**
 * Clear Input Button
 * @returns JSX.Element
 */
const ClearInputButton = (): JSX.Element => (
  <button
    onClick={clearInput}
    className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white"
  >
    Clear
  </button>
);

/**
 * Select Region Button
 * @returns JSX.Element
 */
const SelectRegionButton = (): JSX.Element => {
  return (
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Select Region
    </button>
  );
};

/**
 * Upload Photo Button
 * @returns JSX.Element
 */
const UploadPhotoButton = (): JSX.Element => {
  return (
    <button className="mt-4 w-full rounded-md bg-primary px-2 py-2 font-medium text-white">
      Upload Photo
    </button>
  );
};

/**
 * Clear the add agent input
 */
function clearInput(): void {
  const inputs = document.querySelectorAll(
    "#add_name, #add_email, #add_title, #add_level, #add_languages, #add_license",
  );

  // For each input, set the value to an empty string
  inputs.forEach((input) => ((input as HTMLInputElement).value = ""));

  // Get the permissions checklist
  const perms = document.getElementById("add_perms") as HTMLInputElement;

  // Iterate through the children and uncheck them
  for (let i = 0; i < perms.children.length; i++) {
    const child = perms.children[i] as HTMLInputElement;
    child.checked = false;
  }
}

/**
 * Add an agent
 */
const putAgent = async (input: {}, authorization: string) => {
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
 * Get the inputs from the add agent section
 */
const getInput = (): any => {
  // Get the inputs
  const values = document.querySelectorAll(
    "#add_name, #add_email, #add_title, #add_level, #add_languages, #add_license",
  );

  // Store all of the values in an object
  let result = {};

  // Iterate through the values
  for (let i = 0; i < values.length; i++) {
    const value = (values[i] as HTMLInputElement).value;

    // If the value is empty, return an error
    if (!value) return { error: "All fields are required" };

    // Get the key and add it to the result object
    const key = values[i].id.replace("add_", "");
    result = { ...result, [key]: value };
  }

  // Return the result
  return result;
};

/**
 * Get the permissions
 */
const getPermissions = (): string[] => {
  const permissions = ["agent"];

  // Get the permissions checklist
  const perms = document.getElementById("add_perms") as HTMLInputElement;

  // Iterate through the children and add the checked ones to the permissions array
  for (let i = 0; i < perms.children.length; i++) {
    const child = perms.children[i] as HTMLInputElement;
    if (child.checked) permissions.push(child.value);
  }

  // Return the permissions
  return permissions;
};

/**
 * Get the agent info from the inputs and checklist
 */
const getAgentInfo = (): any => {
  const inputs = getInput();
  const permissions = getPermissions();
  const photo = "/images/default_agent_headshot.png";
  const region = {
    location: "Kitchener, Waterloo ON",
    lat: 0,
    long: 0,
  };

  return {
    ...inputs,
    photo,
    region,
    permissions,
  };
};
