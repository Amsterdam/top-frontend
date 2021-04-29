import React from "react"
import * as wizardSteps from "./components/NoteWizardFormDefinitions"

type FormValuesBase = {
  id?: number
  start_time: string
  author: string
  itinerary_item: number
}

export type FormValuesNoAccess = FormValuesBase & {
  situation: "nobody_present" | "no_cooperation"
  observations: string[] | null
  suggest_next_visit: "weekend" | "daytime" | "evening" | "unknown"
  suggest_next_visit_description_evening: string | null
  suggest_next_visit_description_unknown: string | null
  suggest_next_visit_description_weekend: string | null
  can_next_visit_go_ahead: "yes" | "no"
  can_next_visit_go_ahead_description_no: string | null
  can_next_visit_go_ahead_description_yes: string | null
}

export type FormValuesAccess = FormValuesBase & {
  situation: "access_granted"
  personal_notes: string | null
}

type DefaultFormValues = {
  start_time: string
}

export type FormValues = FormValuesNoAccess | FormValuesAccess | DefaultFormValues

export type WizardStep = keyof typeof wizardSteps

export type OnBackButtonClick = (e: React.MouseEvent) => void
