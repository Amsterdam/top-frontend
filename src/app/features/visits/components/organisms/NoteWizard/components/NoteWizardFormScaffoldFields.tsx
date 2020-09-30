import React from "react"
import { useFormState } from "react-final-form"

import Scaffold from "app/features/shared/components/form/Scaffold"

import * as formDefinitions from "./formDefinitions"
import { OnBackButtonClick, WizardStep } from "../types"

type Props = {
  step: WizardStep
  onBackButtonClicked: OnBackButtonClick,
  observationChoices?: any,
}

const NoteWizardFormScaffoldFields: React.FC<Props> = ({ step, onBackButtonClicked, observationChoices }) => {
  const { values } = useFormState()
  const friendlySituation = values.situation === "nobody_present"
    ? "Er was niemand aanwezig"
    : "Je kreeg geen medewerking"

  return <Scaffold {...formDefinitions[step](onBackButtonClicked, friendlySituation, observationChoices)} />
}

export default NoteWizardFormScaffoldFields
