import getCurrentDate from "./getCurrentDate"

export const mapDateToTime = (value: string) =>
  value.substr(11, 5)

export const mapTimeToDate = (value: string) =>
  `${ getCurrentDate() }T${ value }`
