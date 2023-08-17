import React from "react";

import { generateAuthorization } from "@/app/lib/auth";
import { User, Agent, Location } from "@/app/lib/types";
import { objState, ObjectState } from "@/app/lib/state";

import Input, { ClearInputButton, clearInput, getInputValues } from "./input";
import SelectRegion from "./selectRegion";
import UploadPhoto from "./uploadPhoto";
import PermissionsChecklist from "./permissionsChecklist";

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
  const error = objState<string>("");
  const region = objState<Location | null>(null);
  const photo = objState<string>("/images/default_agent_headshot.png");

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

      <PermissionsChecklist />
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
  const onClick = async () => {
    {
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
      }).then((res) => {
        if (res.status === 200) {
          clearInput();
          props.agents.value = [...props.agents.value, inputValues];
          props.error.set("");
        } else {
          props.error.set("Failed to add agent.");
        }
      });
    }
  };

  return (
    <button
      className="w-full rounded-md bg-white px-2 py-2 font-medium text-primary hover:bg-slate-200"
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
  const perms = document.getElementById("perms") as HTMLInputElement;

  for (let i = 0; i < perms.children.length; i++) {
    const child = perms.children[i] as HTMLInputElement;

    if (child.checked) {
      result.push(child.value);
    }
  }

  return result;
};
