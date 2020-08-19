import { FormValues } from "../types"
import { mapDateToTime, mapTimeToDate }from "./mapDateToTime"
import { mapYesNoToBoolean, mapBooleanToYesNo }  from "./mapYesNoToBoolean"
import pick from "lodash.pick"

export const mapPostValues = (values: any) : Partial<Components.Schemas.Visit> => {
  const start_time = mapTimeToDate(values.start_time)
  const can_next_visit_go_ahead =
    values.can_next_visit_go_ahead !== undefined ?
    mapYesNoToBoolean(values.can_next_visit_go_ahead) :
    null
  const postValues = {
    ...values,
    start_time,
    can_next_visit_go_ahead
  }
  const fields = [
    "id",
    "start_time",
    "author",
    "itinerary_item",
    "situation"
  ]
  const fieldsNoAccess = [
    "observations",
    "suggest_next_visit",
    "suggest_next_visit_description",
    "can_next_visit_go_ahead",
    "can_next_visit_go_ahead_description"
  ]
  const fieldsAccess = [
    "personal_notes"
  ]
  return postValues.situation === "access_granted" ?
    pick(postValues, [...fields, ...fieldsAccess]) :
    pick(postValues, [...fields, ...fieldsNoAccess])
}

export const mapInitialValues = (values: Components.Schemas.Visit) : FormValues => {
  const start_time = mapDateToTime(values.start_time)
  const can_next_visit_go_ahead = mapBooleanToYesNo(values.can_next_visit_go_ahead)
  return { ...values, start_time, can_next_visit_go_ahead }
}
