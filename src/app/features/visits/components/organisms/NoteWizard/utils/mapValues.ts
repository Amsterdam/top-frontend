import { FormValues } from "../types"
import { mapDateToTime, mapTimeToDate }from "./mapDateToTime"
import { mapYesNoToBoolean, mapBooleanToYesNo }  from "./mapYesNoToBoolean"

export const mapPostValues = (values: FormValues) : Partial<Components.Schemas.Visit> => {
  const start_time = mapTimeToDate(values.start_time)
  const can_next_visit_go_ahead =
    values.can_next_visit_go_ahead !== undefined ?
    mapYesNoToBoolean(values.can_next_visit_go_ahead) :
    null
  return ({
    ...values,
    start_time,
    can_next_visit_go_ahead
  })
}

export const mapInitialValues = (values: Components.Schemas.Visit) : FormValues => {
  const start_time = mapDateToTime(values.start_time)
  const can_next_visit_go_ahead = mapBooleanToYesNo(values.can_next_visit_go_ahead)
  return { ...values, start_time, can_next_visit_go_ahead }
}
