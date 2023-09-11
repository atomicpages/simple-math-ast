import { pipe, prop, equals } from "ramda";

import { Types } from "./types";

const isType = (type: Types) => pipe(prop("type"), equals(type));

export const isNumber = isType(Types.NUMBER);
export const isConstant = isType(Types.CONSTANT);
export const isVariable = isType(Types.VARIABLE);
export const isOperator = isType(Types.OPERATOR);
export const isNamedFunction = isType(Types.NAMED_FUNCTION);
export const isLeftParenthesis = isType(Types.LEFT_PARENTHESIS);
export const isRightParenthesis = isType(Types.RIGHT_PARENTHESIS);
