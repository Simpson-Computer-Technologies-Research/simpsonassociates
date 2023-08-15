import React from "react";
import { User } from "@/pages/agents/middleware";
import { generateAuthorization } from "@/app/lib/auth";

/**
 * Remove Agent Button
 * @param props the props of the button
 * @returns JSX.Element
 */
export default function RemoveAgentButton(props: {
  user: User;
  agent: any;
}): JSX.Element {
  if (!props.agent) {
    return <></>;
  }
  const [confirm, setConfirm] = React.useState<boolean>(false);

  return confirm ? (
    <RemoveConfirmation setConfirm={setConfirm} {...props} />
  ) : (
    <button
      className="rounded-md bg-white px-10 py-2 font-medium text-primary"
      onClick={() => setConfirm(true)}
    >
      Remove
    </button>
  );
}

/**
 * Remove Confirmation
 * @param props the props of the confirmation
 * @returns JSX.Element
 */
const RemoveConfirmation = (props: {
  setConfirm: (confirm: boolean) => void;
  user: User;
  agent: any;
}): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-center">
      <p className="mr-4 text-lg font-medium text-white">Are you sure?</p>
      <div className="flex flex-row items-center justify-between">
        <button
          onClick={async () => {
            props.setConfirm(false);
            await removeAgent(
              props.user.accessToken || "",
              props.user.email || "",
              props.agent.user_id,
            );
          }}
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
        >
          Yes
        </button>
        <button
          className="mx-2 rounded-md bg-white px-10 py-2 font-medium text-primary"
          onClick={() => props.setConfirm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/**
 * Remove Agent via api
 * @returns boolean for success/failure
 */
const removeAgent = async (
  accessToken: string,
  accessEmail: string,
  user_id: string,
): Promise<boolean> => {
  if (!accessToken || !accessEmail || !user_id) {
    return false;
  }

  // Generate a new authorization token
  const authorization = await generateAuthorization(accessToken, accessEmail);

  // Remove the agent
  return await fetch("/api/agents", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      agent_id: user_id,
    }),
  })
    .then((res) => res.json())
    .then((json) => json && json.result && json.result.deletedCount === 1);
};
