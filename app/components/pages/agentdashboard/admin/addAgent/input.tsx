"use client";

/**
 * Input Component
 * @param props
 * @returns JSX.Element
 */
interface InputProps {
  placeholder: string;
  id: string;
  default?: string;
}
export default function Input(props: InputProps): JSX.Element {
  return (
    <input
      id={props.id}
      type="text"
      className="w-auto rounded-md px-2 py-2"
      placeholder={props.placeholder}
      defaultValue={props.default || ""}
    />
  );
}

/**
 * Clear Input Button
 * @returns JSX.Element
 */
export const ClearInputButton = (): JSX.Element => (
  <button
    onClick={clearInput}
    className="w-full rounded-md bg-white px-2 py-2 font-medium text-primary hover:bg-slate-200"
  >
    Clear
  </button>
);

/**
 * Clear the add agent input
 */
export const clearInput = (): void => {
  clearFields();
  clearPermissions();
  clearPhoto();
};

const clearFields = () => {
  const inputs = document.querySelectorAll(
    "#name, #email, #title, #lang, #license",
  );
  inputs.forEach((input) => ((input as HTMLInputElement).value = ""));
};

const clearPermissions = () => {
  const manage_events = document.getElementById(
    "permission_manage_events",
  ) as HTMLInputElement;
  const admin = document.getElementById("permission_admin") as HTMLInputElement;
  manage_events.checked = false;
  admin.checked = false;
};

const clearPhoto = () => {
  const photo = document.getElementById("photo") as HTMLInputElement;
  photo.files = null;
};

/**
 * Get the inputs from the add agent section
 * @return the inputs from the add agent section
 */
export const getInputValues = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const lang = document.getElementById("lang") as HTMLInputElement;
    const license = document.getElementById("license") as HTMLInputElement;
    const team = document.getElementById("team") as HTMLInputElement;

    if (!name.value || !email.value || !title.value) {
      reject({ error: "Missing required fields" });
    }

    const result = {
      name: name.value,
      email: email.value,
      title: title.value,
      lang: lang.value,
      license: license.value,
      team: team.value,
    };

    resolve(result);
  });
};
