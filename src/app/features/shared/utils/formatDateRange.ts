import formatDate from "app/features/shared/utils/formatDate"

const formatDateRange = (o: { date_from: string | null, date_to?: string | null }) => {
  if (o.date_from && o.date_to) {
    return `${ formatDate(o.date_from) } – ${ formatDate(o.date_to) }`
  }

  if (o.date_from) {
    return `per ${ formatDate(o.date_from) }`
  }

  return null
}

export default formatDateRange
