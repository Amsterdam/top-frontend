const isBetweenDates = (from: Date, to: Date, date: Date): boolean => {
  const n = date.valueOf()
  return from.valueOf() < n && to.valueOf() > n
}
export default isBetweenDates
