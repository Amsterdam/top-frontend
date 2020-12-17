import { useCallback, useContext } from "react"
import { NoteWizardContext } from "../NoteWizardProvider"
import { FormValues, WizardStep } from "app/features/visits/components/organisms/NoteWizard/types"

export const useNoteWizard = (caseID: string) => {
  const {
    getCurrentStep: getCurrentStepFromContext,
    pushStep: pushStepToContext,
    popStep: popStepFromContext,
    clearSteps: clearStepsInContext,
    setValues: setValuesInContext,
    getValues: getValuesFromContext
  } = useContext(NoteWizardContext)

  const getCurrentStep = useCallback(() => getCurrentStepFromContext(caseID), [ caseID, getCurrentStepFromContext ])
  const popStep = useCallback(() => popStepFromContext(caseID), [ caseID, popStepFromContext ])
  const pushStep = useCallback((step: WizardStep) => pushStepToContext(caseID, step), [ caseID, pushStepToContext ])
  const clearSteps = useCallback(() => clearStepsInContext(caseID), [ caseID, clearStepsInContext ])
  const setValues = useCallback((values: FormValues) => setValuesInContext(caseID, values), [ caseID, setValuesInContext ])
  const getValues = useCallback(() => getValuesFromContext(caseID), [ caseID, getValuesFromContext ])

  return {
    getCurrentStep,
    popStep,
    pushStep,
    clearSteps,
    setValues,
    getValues
  }
}
