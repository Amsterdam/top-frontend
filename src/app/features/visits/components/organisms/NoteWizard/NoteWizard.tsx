import React, { useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { useParams } from "@reach/router"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"
import { getCurrentTime } from "./utils/getCurrentTime"

const NoteWizard: React.FC = () => {
  const { caseId } = useParams()
  const { pushStep, popStep, getCurrentStep, getValues, setValues } = useNoteWizard(caseId)

  const wizardStep = getCurrentStep() ?? "stepOne"
  const initialValues = getValues() ?? { start_time: getCurrentTime() }

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    switch(wizardStep) {
      case "stepOne":
        pushStep(
          values.situation === "accessGranted"
            ? "accessGranted"
            : "notableThings"
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
  }, [pushStep, setValues, wizardStep])

  return (
    <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues} keepDirtyOnReinitialize={true}>
      <NodeWizardSubtitle caseID={ caseId } />
      <NoteWizardFormScaffoldFields step={wizardStep} onBackButtonClicked={handleBackButtonClick} />
      <NoteWizardManager caseID={ caseId } />
    </ScaffoldForm>
  )
}

export default NoteWizard
