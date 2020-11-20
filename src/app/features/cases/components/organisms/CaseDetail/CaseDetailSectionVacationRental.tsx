import React, { FC } from "react"

import { useCase } from "app/state/rest"

type Props = {
  caseId: string
}

const CaseDetailSectionVacationRental: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  return <div>{ !!caseData }</div>
}

export default CaseDetailSectionVacationRental
