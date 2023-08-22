"use client";

import React from "react";

import { generateAuthorization } from "@/app/lib/auth";
import { User, Agent, Location } from "@/app/lib/types";
import { ObjectState } from "@/app/lib/state";

import Input, { ClearInputButton, clearInput, getInputValues } from "./input";
import SelectRegion from "./selectRegion";
import UploadPhoto from "./uploadPhoto";
import PermissionsChecklist, {
  PriorityCheckbox,
  TeamChecklist,
} from "./checklists";

/**
 * Add Agent Component
 * @param props
 * @returns JSX.Element
 */
interface AddAgentProps {
  user: User;
  agents: ObjectState<Agent[]>;
}
export default function AddAgent(props: AddAgentProps): JSX.Element {
  const error = new ObjectState<string>("");
  const region = new ObjectState<Location | null>(null);
  const photo = new ObjectState<string>(
    "/images/default_agent_headshot_primary.png",
  );

  // Eeturn the component jsx
  return (
    <section
      id="add-agent"
      className="flex h-fit w-full flex-col gap-2 bg-primary p-7"
    >
      <h1 className="text-4xl font-bold text-white">Add Agent</h1>
      <p className="text-sm text-white">Add an agent to your team!</p>

      <div className="flex flex-col gap-2">
        <Input placeholder="Name" id="name" />
        <Input placeholder="Email" id="email" />
        <Input placeholder="Title" id="title" />
        <Input placeholder="Language" id="lang" />
        <Input placeholder="License #" id="license" />
        <SelectRegion region={region} agent={null} />
      </div>

      <div className="flex flex-row gap-6">
        <PermissionsChecklist />
        <TeamChecklist />
        <PriorityCheckbox />
      </div>

      <UploadPhoto photo={photo} />

      <div className="flex flex-row gap-4">
        <AddAgentButton
          user={props.user}
          agents={props.agents}
          error={error}
          region={region}
          photo={photo}
        />
        <ClearInputButton />
      </div>

      <p className="text-base font-medium text-red-500">{error.value}</p>
    </section>
  );
}

/**
 * Add Agent Button
 * @param props
 * @returns JSX.Element
 */
interface AddAgentButtonProps {
  user: User;
  agents: ObjectState<Agent[]>;
  error: ObjectState<string>;
  region: ObjectState<Location | null>;
  photo: ObjectState<string>;
}
const AddAgentButton = (props: AddAgentButtonProps): JSX.Element => {
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const onClick = async () => {
    setDisabled(true);

    if (!props.user.accessToken || !props.user.email) return;

    const authorization: string = await generateAuthorization(
      props.user.accessToken,
      props.user.email,
    );

    const inputValues: any = await getInputValues().catch((e) =>
      props.error.set(e.message),
    );

    const body: Agent = {
      ...inputValues,
      permissions: getPermissions(),
      team: getTeam(),
      priority: getPriority(),
      photo: props.photo.value,
      region: (props.region && props.region.value) || {},
    };

    return await fetch("/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          clearInput();
          props.agents.value = [...props.agents.value, inputValues];
          props.error.set("");
        } else {
          props.error.set("Failed to add agent.");
        }
      })
      .catch((e) => props.error.set(e.message))
      .finally(() => setDisabled(false));
  };

  return (
    <button
      disabled={disabled}
      className="w-full rounded-md bg-white px-2 py-2 font-medium text-primary hover:bg-slate-200 disabled:opacity-50"
      onClick={onClick}
    >
      Add
    </button>
  );
};

/**
 * Get the permissions
 * @return the permissions
 */
const getPermissions = (): string[] => {
  const result: string[] = ["agent"];

  const adminChecked: boolean = (
    document.getElementById("permission_admin") as HTMLInputElement
  ).checked;

  const manageEventsChecked: boolean = (
    document.getElementById("permission_manage_events") as HTMLInputElement
  ).checked;

  if (adminChecked) result.push("admin");
  if (manageEventsChecked) result.push("manage_events");

  return result;
};

/**
 * Get the team (checklist)
 * @return the team
 */
const getTeam = (): string => {
  const teamLeadershipChecked = (
    document.getElementById("team_leadership") as HTMLInputElement
  ).checked;

  const teamSupportChecked = (
    document.getElementById("team_support") as HTMLInputElement
  ).checked;

  if (teamLeadershipChecked) return "leadership";
  if (teamSupportChecked) return "support";

  return "none";
};

/**
 * Get whether the agent is a priority agent
 * @return boolean
 */
const getPriority = (): boolean =>
  (document.getElementById("priority") as HTMLInputElement).checked;
