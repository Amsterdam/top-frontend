const DAYS: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
]

export const getCurrentDay = (): Day =>
  DAYS[new Date().getDay() - 1]
