import React from "react"
import { useFormState } from "react-final-form"

import Scaffold from "../../../form/Scaffold"
import { OnBackButtonClick, Step } from "../formDefinitions/noteWizardFormDefinitions"
import * as formDefinitions from "../formDefinitions/noteWizardFormDefinitions"

type Props = {
  step: Step
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
