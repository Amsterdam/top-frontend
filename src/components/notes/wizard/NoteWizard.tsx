import React, { useCallback } from "react"
import { DebugFormState, ScaffoldForm } from "amsterdam-react-final-form"
import { useParams } from "@reach/router"

import Scaffold from "../../form/Scaffold"

import * as formDefinitions from "./formDefinitions/noteWizardFormDefinitions"
import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./NoteWizardManager"

const NoteWizard: React.FC = () => {
  const { itineraryItemId } = useParams()
  const { pushStep, popStep, getCurrentStep, getValues } = useNoteWizard(itineraryItemId)

  const step = getCurrentStep() ?? "stepOne"
  const initialValues = getValues() ?? {}

  const handleBack = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback(({ situation }) => {
    switch(step) {
      case "stepOne":
        pushStep(
          ["nobodyPresent", "noCooperation"].includes(situation)
            ? "notableThings"
            : "accessGranted"
        )
        break
      case "notableThings":
        pushStep("suggestion")
        break
      case "suggestion":
        pushStep("nextVisit")
        break
      case "nextVisit":
        alert("DONE")
        break
      case "accessGranted":
        alert("DONE")
        break
    }

    return Promise.resolve(true)
  }, [pushStep, step])

  // @ts-ignore
  const friendlySituation = "" === "nobodyPresent"
    ? "Er was niemand aanwezig"
    : "Er werd geen toegang verleend"

  return (
    <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues}>
      <Scaffold {...formDefinitions[step](handleBack, friendlySituation)} />
      <NoteWizardManager caseID={ itineraryItemId } />
    </ScaffoldForm>
  )
}

export default NoteWizard
