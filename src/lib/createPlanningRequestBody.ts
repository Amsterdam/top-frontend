import { openingDate, openingReasons, listsWeek, listsDay } from "../config/planning"

type ListsConfig = {
  number_of_lists: number
  primary_stadium?: Stadium
  secondary_stadia?: Stadia
  exclude_stadia?: Stadia
}

const createPlanningRequestBody = (inputs: number[] | ListsConfig[], dayOfWeek?: number) => {
  const singleDay = dayOfWeek !== undefined
  const lists = singleDay ? listsDay(dayOfWeek!) : listsWeek
  inputs.forEach((input: number | ListsConfig, index: number) => {
    if (lists[index] === undefined) return
    if (typeof input === "number") {
      lists[index].number_of_lists = input
    } else {
      lists[index] = Object.assign(lists[index], input)
    }
  })
  const body = {
    opening_date: openingDate,
    opening_reasons: openingReasons,
    lists
  }
  return body
}
export default createPlanningRequestBody
