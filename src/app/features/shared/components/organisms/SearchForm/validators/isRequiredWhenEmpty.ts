import type { FieldState, FieldValidator } from "final-form"
import { getIn } from "final-form"
import { isRequired } from "@amsterdam/amsterdam-react-final-form"

type Value = number

const isRequiredWhenEmpty = (other: string, message: string): FieldValidator<Value> => (value: Value, allValues: object, meta?: FieldState<Value>) => {
  if (meta === undefined) return
  const otherValue = getIn(allValues, other)
  if (otherValue !== undefined) return
  return isRequired(message)(value)
}

export default isRequiredWhenEmpty
