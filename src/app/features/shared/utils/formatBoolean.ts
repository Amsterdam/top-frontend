import { booleanString } from "app/state/rest"

type BooleanValue = boolean | booleanString

enum ReturnValue {
  No = "Nee",
  Unknown = "Onbekend",
  Yes = "Ja"
}

const formatBoolean = (bool?: BooleanValue): string => {
  if (bool === undefined) {
    return ReturnValue.Unknown
  }

  if (typeof bool === "string") {
    return {
      False: ReturnValue.No,
      True: ReturnValue.Yes,
      UNKNOWN: ReturnValue.Unknown
    }[bool]
  }

  return bool ? ReturnValue.Yes : ReturnValue.No
}

export default formatBoolean
