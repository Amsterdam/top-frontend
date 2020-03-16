const isWeekDay = () => {
  const day = (new Date()).getDay()
  return day !== 0 && day !== 6
}
export default isWeekDay
