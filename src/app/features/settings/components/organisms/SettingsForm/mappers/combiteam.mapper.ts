export const mapCombiteamToBoolean = (value: string) => {
  if (value === "include") return true
  if (value === "exclude") return false
  return null
}

export const mapCombiteamToString = (value: boolean | null | undefined) => {
  if (value === true) return "include"
  if (value === false) return "exclude"
  return "ignore"
}
