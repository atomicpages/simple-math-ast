import type { Token } from "../types";
import { isNil } from "./utils";

export function buildToken(data: Partial<Token>, value: Token["value"]): Token {
  return {
    value,
    ...data,
  } as Token;
}

export const isToken = ({ type, value }: Token) =>
  !isNil(type) && !isNil(value);
