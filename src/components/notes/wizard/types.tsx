import React from "react"
import * as wizardSteps from "./components/formDefinitions"

export type NoAccessGrantedValues = {
  situation: "nobodyPresent" | "noCooperation"
  start_time: string
  notableThings: readonly string[]
  suggestion: string
  explanation: string
  nextVisit: string
  choiceNo: string
  choiceYes: string
}

export type AccessGrantedValues = {
  situation: "accessGranted"
  start_time: string
}

export type FormValues = NoAccessGrantedValues | AccessGrantedValues | { start_time: string }

export type WizardStep = keyof typeof wizardSteps

export type OnBackButtonClick = (e: React.MouseEvent) => void
