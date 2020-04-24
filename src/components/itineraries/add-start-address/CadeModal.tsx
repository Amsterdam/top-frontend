import React from "react"
import DefaultModal from "../../global/Modal/DefaultModal"
import Case from "../../cases/Case"

type Props = {
  caseId: CaseId
  onClose: () => void
}

const CaseModal: React.FC<Props> = ({ caseId }) => (
  <DefaultModal title='Zaakinformatie'>
    <Case caseId={caseId}/>
  </DefaultModal>
)


export default CaseModal
