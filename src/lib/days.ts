import capitalizeString from "./utils/capitalize"

const days = [
  { key: "monday", title: "maandag" },
  { key: "tuesday", title: "dinsdag" },
  { key: "wednesday", title: "woensdag" },
  { key: "thursday", title: "donderdag" },
  { key: "friday", title: "vrijdag" },
  { key: "saturday", title: "zaterdag" },
  { key: "sunday", title: "zondag" }
]
export default days
export const getTitle = (key: string | number, capitalize = false): string => {
  const isKey = typeof key === "string"
  const day = isKey ? days.find(day => day.key === key) : days[key as Index]
  const str = day ? day.title : ""
  const title = capitalize ? capitalizeString(str) : str
  return title
}
