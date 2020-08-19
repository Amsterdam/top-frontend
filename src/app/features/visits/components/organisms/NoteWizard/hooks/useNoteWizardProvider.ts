import { useCallback, useReducer } from "react"
import produce from "immer"

import { FormValues, WizardStep } from "../types"

export type WizardState = {
  steps: WizardStep[]
  formValues: FormValues
}

type State = Record<string, WizardState>
type Action =
  | { type: "SET_VALUES", caseId: string, formValues: FormValues }
  | { type: "POP_STEP", caseId: string }
  | { type: "PUSH_STEP", caseId: string, step: WizardStep }
  | { type: "CLEAR_STEPS", caseId: string }

const reducer = produce((draft: State, action: Action) => {
  if (draft[action.caseId] === undefined) {
    draft[action.caseId] = { steps: [], formValues: { start_time: "" } }
  }

  switch(action.type) {
    case "SET_VALUES":
      draft[action.caseId].formValues = action.formValues
      break
    case "PUSH_STEP":
      draft[action.caseId].steps.push(action.step)
      break
    case "POP_STEP":
      draft[action.caseId].steps.pop()
      break
    case "CLEAR_STEPS":
      draft[action.caseId].steps = []
      break
  }
})

export const useNoteWizardProvider = () => {
  const [state, dispatch] = useReducer(reducer, {} as State)

  const setValues = useCallback((caseId: string, formValues: FormValues) =>
      dispatch({ type: "SET_VALUES", caseId, formValues }),
    [ dispatch ]
  )

  const getValues = useCallback((caseId: string): FormValues|undefined =>
      state[caseId]?.formValues as FormValues,
    [ state ]
  )

  const pushStep = useCallback((caseId: string, step: WizardStep) =>
    dispatch({ type: "PUSH_STEP", caseId, step }),
    [ dispatch ]
  )

  const popStep = useCallback((caseId: string) =>
    dispatch({ type: "POP_STEP", caseId }),
    [ dispatch ]
  )

  const clearSteps = useCallback((caseId: string) =>
    dispatch({ type: "CLEAR_STEPS", caseId }),
    [ dispatch ]
  )

  const getCurrentStep = useCallback((caseId: string): WizardStep|undefined =>
    state[caseId]?.steps[ state[caseId].steps.length - 1 ],
    [ state ]
  )

  return {
    state,
    setValues,
    getValues,
    pushStep,
    popStep,
    clearSteps,
    getCurrentStep
  }
}
