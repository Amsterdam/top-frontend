const DAYS: Days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

export default (date: Date = new Date()): Day => DAYS[date.getDay()]
