import React from "react"
import DefaultModal from "../../global/Modal/DefaultModal"
import Case from "../../cases/Case"
import { useCaseModal } from "./hooks/useCaseModal"

const CaseModal: React.FC = () => {
  const { shouldShow, id } = useCaseModal()

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title='Zaakinformatie'>
      <Case caseId={id as CaseId}/>
    </DefaultModal>
  )
}


export default CaseModal
