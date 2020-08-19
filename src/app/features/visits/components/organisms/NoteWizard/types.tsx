import React from "react"
import * as wizardSteps from "./components/formDefinitions"

export type FormValues = {
  situation?: "nobody_present" | "no_cooperation" | "access_granted"
  start_time: string
  observations?: string[] | null
  suggest_next_visit?: "weekend" | "daytime" | "evening" | "unknown"
  suggest_description?: string | null
  can_next_visit_go_ahead?: "yes" | "no"
  can_next_visit_go_ahead_description?: string | null
}

export type WizardStep = keyof typeof wizardSteps

export type OnBackButtonClick = (e: React.MouseEvent) => void
