/**
 * Permissions checklist
 * @returns JSX.Element
 */
export default function PermissionsChecklist(): JSX.Element {
  return (
    <div id="perms" className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Permissions</p>
      <div className="flex flex-wrap gap-4 ">
        <PermissionsCheckbox value="post_events" label="Post Events" />
        <PermissionsCheckbox value="admin" label="Admin" />
      </div>
    </div>
  );
}

export const TeamChecklist = (): JSX.Element => {
  return (
    <div id="team" className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Team</p>
      <div className="flex flex-wrap gap-4 ">
        <Checkbox default={false} value="executive" label="Executive" />
        <Checkbox default={false} value="sales" label="Support" />
        <Checkbox default={false} value="marketing" label="Marketing" />
      </div>
    </div>
  );
};

export const PriorityCheckbox = (): JSX.Element => {
  return (
    <div id="priority" className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Priority</p>
      <Checkbox default={false} value="priority" label="Priority" />
    </div>
  );
};

/**
 * Permissions checkbox
 * @param props
 * @returns JSX.Element
 */
interface PermissionsCheckboxProps {
  value: string;
  label: string;
  permissions?: string[];
}
const PermissionsCheckbox = (props: PermissionsCheckboxProps): JSX.Element => {
  const defaultChecked: boolean =
    (props.permissions && props.permissions.includes(props.value)) || false;

  return (
    <div className="flex flex-row gap-2 text-white">
      <Checkbox
        default={defaultChecked}
        value={props.value}
        label={props.label}
      />
    </div>
  );
};

const Checkbox = (props: {
  label: string;
  default: boolean;
  value: string;
}): JSX.Element => {
  return (
    <div className="flex flex-row gap-2 text-white">
      <input
        defaultChecked={props.default}
        type="checkbox"
        value={props.value}
        className="h-6 w-6"
      />
      <label htmlFor={props.value}>{props.label}</label>
    </div>
  );
};
