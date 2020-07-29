import { useCallback, useContext } from "react"
import { NoteWizardContext } from "../NoteWizardProvider"
import { FormValues, WizardStep } from "../types"

export const useNoteWizard = (caseID: CaseId) => {
  const {
    getCurrentStep: getCurrentStepFromContext,
    pushStep: pushStepToContext,
    popStep: popStepFromContext,
    setValues: setValuesInContext,
    getValues: getValuesFromContext
  } = useContext(NoteWizardContext)

  const getCurrentStep = useCallback(() => getCurrentStepFromContext(caseID), [ caseID, getCurrentStepFromContext ])
  const popStep = useCallback(() => popStepFromContext(caseID), [ caseID, popStepFromContext ])
  const pushStep = useCallback((step: WizardStep) => pushStepToContext(caseID, step), [ caseID, pushStepToContext ])
  const setValues = useCallback((values: FormValues) => setValuesInContext(caseID, values), [ caseID, setValuesInContext ])
  const getValues = useCallback(() => getValuesFromContext(caseID), [ caseID, getValuesFromContext ])

  return {
    getCurrentStep,
    popStep,
    pushStep,
    setValues,
    getValues
  }
}
