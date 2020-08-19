export const mapYesNoToBoolean = (value: "yes" | "no") =>
  value === "yes" ? true : false
export const mapBooleanToYesNo = (value: boolean | undefined | null) =>
  value === true ? "yes" : "no"
