const DAYS: Days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

export default (): Day =>
  DAYS[new Date().getDay()]
