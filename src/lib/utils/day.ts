const DAYS: Day[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

export const getCurrentDay = (): Day =>
  DAYS[new Date().getDay()]
