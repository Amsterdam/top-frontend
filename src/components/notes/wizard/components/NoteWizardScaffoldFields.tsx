import React from "react"
import { useFormState } from "react-final-form"

import Scaffold from "../../../form/Scaffold"
import * as formDefinitions from "./formDefinitions"
import { OnBackButtonClick, WizardStep } from "../types"

type Props = {
  step: WizardStep
  onBackButtonClicked: OnBackButtonClick
}

const NoteWizardFormScaffoldFields: React.FC<Props> = ({ step, onBackButtonClicked }) => {
  const { values } = useFormState()

  const friendlySituation = values.situation === "nobodyPresent"
    ? "Er was niemand aanwezig"
    : "Er werd geen toegang verleend"

  return <Scaffold {...formDefinitions[step](onBackButtonClicked, friendlySituation)} />
}

export default NoteWizardFormScaffoldFields
