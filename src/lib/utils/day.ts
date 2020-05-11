export type Day = keyof API.PlannerWeekSettings
export type DayPart = keyof API.PlannerDaySettings

const DAYS: Day[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

export default (date = new Date()): Day => DAYS[date.getDay()]
