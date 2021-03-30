import React, { FC } from "react"
import { useCase } from "app/state/rest"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseId: string
}

const Status: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  console.log(caseData?.current_states)

  return (
    <CaseDetailSection
      title="Status"
      dataSource="Zaaksysteem">
      <p>Timeline goes here.</p>
    </CaseDetailSection>
  )
}

export default Status
