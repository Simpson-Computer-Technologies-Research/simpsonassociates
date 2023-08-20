/**
 * Permissions checklist
 * @returns JSX.Element
 */
export default function PermissionsChecklist(): JSX.Element {
  return (
    <div className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Permissions</p>
      <div className="flex flex-wrap gap-4">
        <PermissionsCheckbox
          id="permission_manage_events"
          value="manage_events"
          label="Manage Events"
        />
        <PermissionsCheckbox
          id="permission_admin"
          value="admin"
          label="Admin"
        />
      </div>
    </div>
  );
}

/**
 * Permissions checkbox
 * @param props
 * @returns JSX.Element
 */
interface PermissionsCheckboxProps {
  id: string;
  value: string;
  label: string;
  permissions?: string[];
}
const PermissionsCheckbox = (props: PermissionsCheckboxProps): JSX.Element => {
  const defaultChecked: boolean =
    (props.permissions && props.permissions.includes(props.value)) || false;

  return (
    <Checkbox
      id={props.id}
      default={defaultChecked}
      value={props.value}
      label={props.label}
    />
  );
};

export const TeamChecklist = (): JSX.Element => {
  return (
    <div className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Team</p>
      <div className="flex flex-wrap gap-4" id="team">
        <Checkbox
          id="team_leadership"
          default={false}
          value="leadership"
          label="Leadership"
        />
        <Checkbox
          id="team_support"
          default={false}
          value="support"
          label="Support"
        />
      </div>
    </div>
  );
};

export const PriorityCheckbox = (): JSX.Element => {
  return (
    <div className="mb-3 flex h-full w-full flex-col gap-2">
      <p className="font-medium text-white">Priority</p>
      <Checkbox
        id="priority"
        default={false}
        value="priority"
        label="Priority"
      />
    </div>
  );
};

export const Checkbox = (props: {
  id: string;
  label: string;
  default: boolean;
  value: string;
}): JSX.Element => {
  return (
    <div className="flex flex-row gap-2 text-white">
      <input
        id={props.id}
        defaultChecked={props.default}
        type="checkbox"
        value={props.value}
        className="h-6 w-6"
      />
      <label htmlFor={props.value}>{props.label}</label>
    </div>
  );
};
