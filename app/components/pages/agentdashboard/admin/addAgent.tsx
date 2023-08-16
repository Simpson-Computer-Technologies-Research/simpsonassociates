import { User } from "@/pages/agents/dashboard/middleware";
import React from "react";
import Input from "./input";
import { generateAuthorization } from "@/app/lib/auth";

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
    <section
      id="add-agent"
      className="flex h-fit w-full flex-col bg-primary p-7"
    >
      <h1 className="text-4xl font-bold text-white">Add Agents</h1>
      <p className="mt-2 text-sm text-white">Add agents to your team!</p>
      <div className="mt-4 grid h-auto w-auto grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AgentInfoInputs />
        <PermissionsChecklist />
      </div>
      <SelectRegionButton />
      <UploadPhotoButton />
      <div className="flex flex-row gap-4">
        <AddAgentButton {...props} setError={setError} />
        <ClearInputButton />
      </div>
      <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
    </section>
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
  putAgent(agentInfo, user.accessToken || "", user.email || "").then((res) => {
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
    <Input ph="Languages" id="add_lang" def="" />
    <Input ph="License" id="add_license" def="" />
  </>
);

/**
 * Permissions checkbox
 * @param props
 * @returns JSX.Element
 */
const PermissionsCheckbox = (props: {
  value: string;
  label: string;
}): JSX.Element => (
  <div className="flex flex-row gap-2 text-white">
    <input type="checkbox" value={props.value} className="h-6 w-6" />
    <label htmlFor={props.value}>{props.label}</label>
  </div>
);

/**
 * Permissions checklist
 * @returns JSX.Element
 */
const PermissionsChecklist = (): JSX.Element => (
  <div id="add_perms" className="flex h-full w-full flex-col gap-2">
    <p className="font-medium text-white">Permissions</p>
    <div className="flex flex-wrap gap-4 ">
      <PermissionsCheckbox value="manager" label="Post Events" />
      <PermissionsCheckbox value="admin" label="Admin" />
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
    className="mt-4 w-full rounded-md bg-white px-2 py-2 font-medium text-primary"
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
    className="mt-4 w-full rounded-md bg-white px-2 py-2 font-medium text-primary"
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
    <button className="mt-4 w-full rounded-md bg-white px-2 py-2 font-medium text-primary">
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
    <button className="mt-4 w-full rounded-md bg-white px-2 py-2 font-medium text-primary">
      Upload Photo
    </button>
  );
};

/**
 * Clear the add agent input
 */
function clearInput(): void {
  const inputs = document.querySelectorAll(
    "#add_name, #add_email, #add_title, #add_level, #add_lang, #add_license",
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
const putAgent = async (data: {}, accessToken: string, accessEmail: string) => {
  if (!accessToken || !accessEmail) return;

  const authorization = await generateAuthorization(accessToken, accessEmail);

  return await fetch("/api/agents", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
};

/**
 * Get the inputs from the add agent section
 */
const getInput = (): any => {
  const values = document.querySelectorAll(
    "#add_name, #add_email, #add_title, #add_level, #add_lang, #add_license",
  );

  let result = {};
  for (let i = 0; i < values.length; i++) {
    const value = (values[i] as HTMLInputElement).value;

    if (!value) {
      return { error: "All fields are required" };
    }

    // Get the key and add it to the result object
    const key = values[i].id.replace("add_", "");
    result = { ...result, [key]: value };
  }

  return result;
};

/**
 * Get the permissions
 */
const getPermissions = (): string[] => {
  const result = ["agent"];
  const perms = document.getElementById("add_perms") as HTMLInputElement;

  // Iterate through the children and add the checked 
  // ones to the permissions array
  for (let i = 0; i < perms.children.length; i++) {
    const child = perms.children[i] as HTMLInputElement;

    if (child.checked) {
      result.push(child.value);
    }
  }

  return result;
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
