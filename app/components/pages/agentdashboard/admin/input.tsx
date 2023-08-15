/**
 * Input for the modify agent section
 * ph: placeholder
 * id: id
 * def: default value
 */
export default function Input(props: {
  ph: string;
  id: string;
  def: string;
}): JSX.Element {
  return (
    <input
      id={props.id}
      type="text"
      className="w-auto rounded-md border-2 border-primary px-2 py-2"
      placeholder={props.ph}
      defaultValue={props.def}
    />
  );
}
