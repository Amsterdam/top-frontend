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

  switch (postValues.suggest_next_visit) {
    case "daytime":
      postValues.suggest_next_visit_description = undefined
      break
    case "evening":
      postValues.suggest_next_visit_description = values.suggest_next_visit_description_evening
      break
    case "unknown":
      postValues.suggest_next_visit_description = values.suggest_next_visit_description_unknown
      postValues.can_next_visit_go_ahead = false
      break
    case "weekend":
      postValues.suggest_next_visit_description = values.suggest_next_visit_description_weekend
      break
  }

  postValues.can_next_visit_go_ahead_description = postValues.can_next_visit_go_ahead ? values.can_next_visit_go_ahead_description_yes : values.can_next_visit_go_ahead_description_no

  return postValues.situation === "access_granted" ?
    { ...postValues, ...fieldsNoAccess } :
    { ...postValues, ...fieldsAccess }
}

export const mapInitialValues = (values: Components.Schemas.Visit): FormValues => {
  const start_time = mapDateToTime(values.start_time)

  const suggest_next_visit_description_evening = values.suggest_next_visit === "evening" ? values.suggest_next_visit_description : undefined
  const suggest_next_visit_description_unknown = values.suggest_next_visit === "unknown" ? values.suggest_next_visit_description : undefined
  const suggest_next_visit_description_weekend = values.suggest_next_visit === "weekend" ? values.suggest_next_visit_description : undefined

  const can_next_visit_go_ahead = mapBooleanToYesNo(values.can_next_visit_go_ahead)
  const can_next_visit_go_ahead_description_no = !values.can_next_visit_go_ahead ? values.can_next_visit_go_ahead_description : undefined
  const can_next_visit_go_ahead_description_yes = values.can_next_visit_go_ahead ? values.can_next_visit_go_ahead_description : undefined

  return {
    ...values,
    start_time,
    suggest_next_visit_description_evening,
    suggest_next_visit_description_unknown,
    suggest_next_visit_description_weekend,
    can_next_visit_go_ahead,
    can_next_visit_go_ahead_description_no,
    can_next_visit_go_ahead_description_yes
  }
}
