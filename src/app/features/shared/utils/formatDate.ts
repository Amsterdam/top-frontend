const months = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
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

const formatDate = (date: string | Date, includeWeekDay = false, includeYear = true): string | undefined => {
  const dateObj = (typeof date === "object") ? date : new Date(date)

  if (dateObj.toString() === "Invalid Date") {
    return undefined
  }

  let formattedDate: any[] = []

  if (includeWeekDay) {
    formattedDate.push(days[dateObj.getDay()])
  }

  formattedDate.push(dateObj.getDate(), months[dateObj.getMonth()])

  if (includeYear) {
    formattedDate.push(dateObj.getFullYear())
  }

  return formattedDate.join(" ")
}

export default formatDate
