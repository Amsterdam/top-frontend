import React, { useCallback } from "react"
import DefaultModal from "../../global/Modal/DefaultModal"
import navigateTo from "../../../lib/navigateTo"
import Wizard from "./Wizard"
import { DebugFormValues } from "amsterdam-react-final-form"

const WizardModal: React.FC = ({}) => {
  const handleClose = useCallback(() => navigateTo("/"), [])
  return (
    <DefaultModal title="Verwerken bezoek" onClose={handleClose}>
      <Wizard />
    </DefaultModal>
  )
}

export default WizardModal
