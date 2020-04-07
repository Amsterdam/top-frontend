import React from 'react'
import DefaultModal from "../../global/Modal/DefaultModal"
import Case from "../../cases/Case"

type Props = {
  caseId: CaseId
}

const CaseModal: React.FC<Props> = ({ caseId }) => (
  <DefaultModal title='Case'>
    <Case caseId={caseId}/>
  </DefaultModal>
)


export default CaseModal
