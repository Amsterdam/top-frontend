const months = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sept",
  "okt",
  "nov",
  "dec"
]

const days = [
  "zo",
  "ma",
  "di",
  "wo",
  "do",
  "vr",
  "za"
]

const formatDate = (str: string | Date, includeDay = false, includeYear = true) : string | undefined => {
  const date = typeof str === "object" ? str : new Date(str)
  if (date.toString() === "Invalid Date") return undefined
  return `${ includeDay ? `${ days[date.getDay()] } ` : "" }${ date.getDate() } ${ months[date.getMonth()] } ${ includeYear ? date.getFullYear() : "" }`
}
export default formatDate
