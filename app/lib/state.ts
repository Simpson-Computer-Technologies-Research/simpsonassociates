import React from "react";
import { SetState } from "./types";

export interface ObjectState<T> {
  value: T;
  set: SetState<T>;
}

export const objState = <T>(intialValue: any): ObjectState<T> => {
  const [value, set] = React.useState<T>(intialValue);
  return { value, set } as ObjectState<T>;
};
