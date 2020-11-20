import React from "react"
import { useFormState } from "react-final-form"

import Scaffold from "app/features/shared/components/form/Scaffold"
import translation from "../../../../lang/nl_nl"

import * as formDefinitions from "./formDefinitions"
import { OnBackButtonClick, WizardStep } from "../types"

type Props = {
  step: WizardStep
  onBackButtonClicked: OnBackButtonClick
  daySettings: Components.Schemas.DaySettings
}

const NoteWizardFormScaffoldFields: React.FC<Props> = ({ step, onBackButtonClicked, daySettings }) => {
  const { values } = useFormState()

  const friendlySituation = values.situation === "nobody_present"
    ? "Er was niemand aanwezig"
    : "Je kreeg geen medewerking"

    const choices = Object.keys({ 
      observation_choices: daySettings.team_settings.observation_choices,
      suggest_next_visit_choices: daySettings.team_settings.suggest_next_visit_choices
    }).reduce((previousValue, currentValue) => { 
      // @ts-ignore
      previousValue[currentValue] = daySettings.team_settings[currentValue].reduce((prev, curr) => {
        prev[curr.value] = curr.verbose
        return prev
      }, {})
      return previousValue
    }, {}) as Components.Schemas.TeamSettings

    const situation_choices = daySettings.team_settings.situation_choices.reduce((t, c) => {
      t[c] = translation["visit_situation_" + c]
      return t
    }, {})
  
  
    return <Scaffold {...formDefinitions[step](onBackButtonClicked, friendlySituation, choices.observation_choices, choices.suggest_next_visit_choices, situation_choices)} />
}

export default NoteWizardFormScaffoldFields