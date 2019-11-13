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

const formatDate = (str: string, includeDay = false) : string | undefined => {
  const date = new Date(str)
  if (date.toString() === "Invalid Date") return undefined
  return `${ includeDay ? `${ days[date.getDay()] } ` : "" }${ date.getDate() } ${ months[date.getMonth()] } ${ date.getFullYear() }`
}
export default formatDate
