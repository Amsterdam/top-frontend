import React, { useCallback, useState } from "react"
import { DebugFormValues, ScaffoldForm } from "amsterdam-react-final-form"

import Scaffold from "../../form/Scaffold"

import * as formDefinitions from "./noteWizardFormDefinitions"

type Step = keyof typeof formDefinitions

const Wizard: React.FC = () => {
  const [situation, setSituation] = useState<string|undefined>()
  const [step, setStep] = useState<Step>("stepOne")

  const handleSubmit = useCallback(({ situation }) => {
    setSituation(situation)

    switch(step) {
      case "stepOne":
        setStep(
          ["nobodyPresent", "noCooperation"].includes(situation)
            ? "notableThings"
            : "accessGranted"
        )
        break
      case "notableThings":
        setStep("suggestion")
        break
      case "suggestion":
        setStep("nextVisit")
        break
      case "nextVisit":
        alert("DONE")
        break
      case "accessGranted":
        alert("DONE")
        break
    }

    return Promise.resolve(true)
  }, [step, setStep, setSituation])

  const friendlySituation = situation === "nobodyPresent"
    ? "Er was niemand aanwezig"
    : "Er werd geen toegang verleend"

  return (
    <ScaffoldForm onSubmit={handleSubmit}>
      <Scaffold {...formDefinitions[step](friendlySituation)} />
      <DebugFormValues />
    </ScaffoldForm>
  )
}

export default Wizard
