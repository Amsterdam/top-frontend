const currentDate = () => {
  const date = new Date()
  const twoDigits = (n: number) => `0${ n }`.slice(-2)
  return `${ date.getFullYear() }-${ twoDigits(date.getMonth() + 1) }-${ twoDigits(date.getDate()) }`
}
export default currentDate
