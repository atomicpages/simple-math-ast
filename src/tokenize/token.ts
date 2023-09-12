import type { Token } from "../types";
import { isNil } from "./utils";
import { curry } from "ramda";
import type { Function as F } from "ts-toolbelt";

export const buildToken: F.Curry<
  (data: Omit<Token, "value">, value: string) => any
> = curry((data, value) => ({
  value,
  ...data,
}));

export const isToken = ({ type, value }: Token) =>
  !isNil(type) && !isNil(value);
