import { FormValues } from "app/features/visits/components/organisms/NoteWizard/types"
import { mapDateToTime, mapTimeToDate } from "./mapDateToTime"
import { mapBooleanToYesNo, mapYesNoToBoolean } from "./mapYesNoToBoolean"

const fieldsNoAccess = {
  observations: null,
  suggest_next_visit: null,
  suggest_next_visit_description: null,
  can_next_visit_go_ahead: null,
  can_next_visit_go_ahead_description: null
}
const fieldsAccess = {
  personal_notes: null,
  description: null
}

export const mapPostValues = (values: any, itinerary_item: number, id: String, author: string): Components.Schemas.Visit => {
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
    case_id: id,
    author
  }

  if (postValues.suggest_next_visit === "unknown") {
    postValues.can_next_visit_go_ahead = false
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
