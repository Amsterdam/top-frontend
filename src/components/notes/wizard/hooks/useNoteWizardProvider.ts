import { useCallback, useReducer } from "react"
import produce from "immer"

import { FormValues, WizardStep } from "../types"

export type WizardState = {
  steps: WizardStep[]
  formValues: FormValues
}

type State = Record<CaseId, WizardState>
type Action =
  | { type: "POP_STEP", caseId: CaseId }
  | { type: "PUSH_STEP", caseId: CaseId, step: WizardStep }
  | { type: "SET_VALUES", caseId: CaseId, formValues: FormValues }

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
  }
})

export const useNoteWizardProvider = () => {
  const [state, dispatch] = useReducer(reducer, {} as State)

  const setValues = useCallback((caseId: CaseId, formValues: FormValues) =>
      dispatch({ type: "SET_VALUES", caseId, formValues }),
    [ dispatch ]
  )

  const getValues = useCallback((caseId: CaseId): FormValues|undefined =>
      state[caseId]?.formValues,
    [ state ]
  )

  const pushStep = useCallback((caseId: CaseId, step: WizardStep) =>
    dispatch({ type: "PUSH_STEP", caseId, step }),
    [ dispatch ]
  )

  const popStep = useCallback((caseId: CaseId) =>
    dispatch({ type: "POP_STEP", caseId }),
    [ dispatch ]
  )

  const getCurrentStep = useCallback((caseId: CaseId): WizardStep|undefined =>
    state[caseId]?.steps[ state[caseId].steps.length - 1 ],
    [ state ]
  )

  return {
    state,
    setValues,
    getValues,
    pushStep,
    popStep,
    getCurrentStep
  }
}
