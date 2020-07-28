import React, { useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { useParams } from "@reach/router"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"

const getCurrentTime = (): string => {
  const date = new Date()
  const hours = date.getHours() < 10 ? `0${ date.getHours() }` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${ date.getMinutes() }` : date.getMinutes()
  return `${ hours }:${ minutes }`
}

const NoteWizard: React.FC = () => {
  const { itineraryItemId } = useParams()
  const { pushStep, popStep, getCurrentStep, getValues, setValues } = useNoteWizard(itineraryItemId)

  const step = getCurrentStep() ?? "stepOne"
  const initialValues = getValues() ?? { time: getCurrentTime() }

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    switch(step) {
      case "stepOne":
        pushStep(
          ["nobodyPresent", "noCooperation"].includes(values.situation)
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
      case "accessGranted":
        alert("DONE")
      break
    }

    return Promise.resolve(true)
  }, [pushStep, setValues, step])

  return (
    <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues} keepDirtyOnReinitialize={true}>
      <NodeWizardSubtitle caseID={ itineraryItemId } />
      <NoteWizardFormScaffoldFields step={step} onBackButtonClicked={handleBackButtonClick} />
      <NoteWizardManager caseID={ itineraryItemId } />
    </ScaffoldForm>
  )
}

export default NoteWizard
