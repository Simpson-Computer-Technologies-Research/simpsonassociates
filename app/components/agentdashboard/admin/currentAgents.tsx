import React from "react";
import Input from "./input";

/**
 * Current Agents and Modify Agents
 * @param props
 * @returns JSX.Element
 */
export default function CurrentAndModifyAgents(props: any): JSX.Element {
  // Store the agents pending modification
  const [pendingMod, setPendingMod] = React.useState<string[]>([]);

  // Update the pending modification
  const updatePendingMod = (agent: string) => {
    if (pendingMod.includes(agent)) return;
    setPendingMod([...pendingMod, agent]);
  };

  // Return the component jsx
  return (
    <div className="mt-4 flex flex-col rounded-md bg-white p-7">
      <p className="text-2xl font-bold text-primary">Current Agents</p>
      <div className="flex h-full w-full flex-col">
        {props.agents &&
          props.agents.map((agent: any) => (
            <AgentCard props={{ agent }}>
              <RemoveAgentButton
                setAgents={props.setAgents}
                agents={props.agents}
              />
              <button
                className="rounded-md bg-primary px-2 py-2 font-medium text-white"
                onClick={() => updatePendingMod(agent)}
              >
                Modify
              </button>
            </AgentCard>
          ))}
      </div>
      <ModifyAgentCard pendingMod={pendingMod} setPendingMod={setPendingMod} />
    </div>
  );
}

/**
 * Modify agent card
 */
const ModifyAgentCard = (props: any): JSX.Element => {
  return (
    <>
      {props.pendingMod.map((agent: any) => (
        <div className="mt-4 flex flex-col rounded-md bg-white p-7">
          <p className="mb-4 text-2xl font-bold text-primary">Modify Agent</p>
          <ModifyAgentInputs
            pendingModification={props.pendingMod}
            setPendingModification={props.setPendingMod}
            agent={agent}
          />
        </div>
      ))}
    </>
  );
};

/**
 * Agent Card
 * @param children the children of the card
 * @param props the props of the card
 * @returns JSX.Element
 */
const AgentCard = ({ children, props }: any): JSX.Element => {
  return (
    <div className="flex h-16 w-full flex-row items-center justify-between px-4">
      <p className="text-lg font-medium text-primary">{props.agent.name}</p>
      <div className="flex flex-row gap-4">{children}</div>
    </div>
  );
};

/**
 * Remove Agent Button
 * @param props the props of the button
 * @returns JSX.Element
 */
const RemoveAgentButton = (props: any): JSX.Element => {
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
 * Modify Agent Inputs
 * @param props the props of the inputs
 * @returns JSX.Element
 */
const ModInputs = (props: any): JSX.Element => (
  <>
    <Input ph="Name" id="modify_name" def={props.agent.name} />
    <Input ph="Email" id="modify_email" def={props.agent.email} />
    <Input ph="Title" id="modify_title" def={props.agent.title} />
    <Input ph="Level" id="modify_level" def={props.agent.level} />
    <Input ph="Languages" id="modify_languages" def={props.agent.lang} />
    <Input ph="License" id="modify_license" def={props.agent.license} />
  </>
);

/**
 * Permissions Checkbox
 * @returns JSX.Element
 */
const PermissionsCheckbox = (props: any): JSX.Element => (
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
 * Permissions Checklist
 * @returns JSX.Element
 */
const PermissionsChecklist = (props: any): JSX.Element => (
  <div id="modify_permissions" className="flex h-full w-full flex-col gap-2">
    <p className="text-lg font-medium text-primary">Permissions</p>
    <PermissionsCheckbox value="post_events" agent={props.agent} text="Post Events"/>
    <PermissionsCheckbox value="admin" agent={props.agent} text="Admin"/>
  </div>
);

/**
 * Modify Agent Inputs
 */
const ModifyAgentInputs = (props: any): JSX.Element => (
  <>
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
