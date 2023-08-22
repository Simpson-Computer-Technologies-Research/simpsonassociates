import { SetState } from "./types";
import { useState } from "react";

/**
 * Interface for a React object state.
 * @param T The type of the state.
 * @property value The value of the state.
 * @property set The function to set the state.
 * @returns A React object state.
 */
export interface ReactObjectState<T> {
  value: T;
  set: SetState<T>;
}

/**
 * Object state is a class so that we can pass references to
 * components instead of creating copies, as well as instead of
 * having to pass the "set..." function and the variable itself
 * separately.
 * @param T The type of the state.
 * @property value The value of the state.
 * @property set The function to set the state.
 * @returns A React object state.
 */
export class ObjectState<T> implements ReactObjectState<T> {
  value: T;
  set: SetState<T>;

  constructor(initialValue: T) {
    const [value, set] = useState<T>(initialValue);
    this.value = value;
    this.set = set;
  }
}
