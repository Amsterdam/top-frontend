export type Day = keyof Components.Schemas.PlannerWeekSettings
export type DayPart = keyof Components.Schemas.PlannerDaySettings

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
