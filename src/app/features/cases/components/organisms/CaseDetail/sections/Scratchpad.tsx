import React, { FC } from "react"

import { useCase } from "app/state/rest"
import Purified from "app/features/shared/components/molecules/Purified/Purified"
import formatDate from "app/features/shared/utils/formatDate"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"

import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const CaseDetailScratchpad: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData || !caseData.statements.length) {
    return null
  }

  const statements = caseData.statements.map(
    ({ user, date, statement }) =>
      <Purified
        className="anonymous"
        text={ `${ formatDate(date, true) }<br /><strong>${ user }</strong><br />${ replaceNewLines(replaceUrls(statement)) }` }
      />
  )

  return (
    <CaseDetailSection
      title="Kladblok"
      dataSource="BWV"
      data={ statements }
    />
  )
}

export default CaseDetailScratchpad
