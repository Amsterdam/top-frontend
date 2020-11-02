import React from "react"
import { useFormState } from "react-final-form"

import Scaffold from "app/features/shared/components/form/Scaffold"

import * as formDefinitions from "./formDefinitions"
import { OnBackButtonClick, WizardStep } from "../types"

type Props = {
  step: WizardStep
  onBackButtonClicked: OnBackButtonClick
  teamSettings: Components.Schemas.TeamSettings
}

const NoteWizardFormScaffoldFields: React.FC<Props> = ({ step, onBackButtonClicked, teamSettings }) => {
  const { values } = useFormState()

  const friendlySituation = values.situation === "nobody_present"
    ? "Er was niemand aanwezig"
    : "Je kreeg geen medewerking"

    const choices = Object.keys({ 
      observation_choices: teamSettings.observation_choices,
      suggest_next_visit_choices: teamSettings.suggest_next_visit_choices,
      situation_choices: teamSettings.situation_choices
    }).reduce((previousValue, currentValue) => { 
      // @ts-ignore
      previousValue[currentValue] = teamSettings[currentValue].reduce((prev, curr) => {
        prev[curr.value] = curr.verbose
        return prev
      }, {})
      return previousValue
    }, {}) as Components.Schemas.TeamSettings
  
  
    return <Scaffold {...formDefinitions[step](onBackButtonClicked, friendlySituation, choices.observation_choices, choices.suggest_next_visit_choices, choices.situation_choices)} />
}

export default NoteWizardFormScaffoldFields