import { FormValues } from "../types"
import { mapDateToTime, mapTimeToDate }from "./mapDateToTime"
import { mapYesNoToBoolean, mapBooleanToYesNo } from "./mapYesNoToBoolean"

const fieldsNoAccess = {
  observations: null,
  suggest_next_visit: null,
  suggest_next_visit_description: null,
  can_next_visit_go_ahead: null,
  can_next_visit_go_ahead_description: null
}
const fieldsAccess = {
  personal_notes: null
}

export const mapPostValues = (values: any, itinerary_item: number, author: string): Components.Schemas.Visit => {
  const start_time = mapTimeToDate(values.start_time)
  const can_next_visit_go_ahead =
    values.can_next_visit_go_ahead !== undefined ?
    mapYesNoToBoolean(values.can_next_visit_go_ahead) :
    null

  const postValues = {
    ...values,
    start_time,
    can_next_visit_go_ahead,
    itinerary_item,
    author
  }
  return postValues.situation === "access_granted" ?
    { ...postValues, ...fieldsNoAccess } :
    { ...postValues, ...fieldsAccess }
}

export const mapInitialValues = (values: Components.Schemas.Visit): FormValues => {
  const start_time = mapDateToTime(values.start_time)
  const can_next_visit_go_ahead = mapBooleanToYesNo(values.can_next_visit_go_ahead)
  return { ...values, start_time, can_next_visit_go_ahead }
}
