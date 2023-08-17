/**
 * Agent Info Inputs
 * @returns JSX.Element
 */
export default function AgentInputs(): JSX.Element {
  return (
    <>
      <Input placeholder="Name" id="name" />
      <Input placeholder="Email" id="email" />
      <Input placeholder="Title" id="title" />
      <Input placeholder="Language" id="lang" />
      <Input placeholder="License" id="license" />
    </>
  );
}

/**
 * Input Component
 * @param props
 * @returns JSX.Element
 */
const Input = (props: {
  placeholder: string;
  id: string;
  default?: string | undefined;
}): JSX.Element => {
  return (
    <input
      id={props.id}
      type="text"
      className="w-auto rounded-md border-2 border-primary px-2 py-2"
      placeholder={props.placeholder}
      defaultValue={props.default || ""}
    />
  );
};

/**
 * Clear Input Button
 * @returns JSX.Element
 */
export const ClearInputButton = (): JSX.Element => (
  <button
    onClick={clearInput}
    className="mt-4 w-full rounded-md bg-white px-2 py-2 font-medium text-primary"
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
  const perms = document.getElementById("perms") as HTMLInputElement;
  for (let i = 0; i < perms.children.length; i++) {
    const child = perms.children[i] as HTMLInputElement;
    child.checked = false;
  }
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

    if (!name.value || !email.value || !title.value) {
      reject({ error: "Missing required fields" });
    }

    const result = {
      name: name.value,
      email: email.value,
      title: title.value,
      lang: lang.value,
      license: "License #" + license.value,
    };

    resolve(result);
  });
};
