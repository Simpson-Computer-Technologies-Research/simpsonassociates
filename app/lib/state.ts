import React from "react";
import { SetState } from "./types";

export interface ReactObjectState<T> {
  value: T;
  set: SetState<T>;
}

export class ObjectState<T> implements ReactObjectState<T> {
  value: T;
  set: SetState<T>;
  constructor(initialValue: T) {
    const [value, set] = React.useState<T>(initialValue);
    this.value = value;
    this.set = set;
  }
}
