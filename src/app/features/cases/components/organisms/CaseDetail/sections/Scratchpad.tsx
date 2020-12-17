import React, { FC } from "react"

import { useCase } from "app/state/rest"
import Purified from "app/features/shared/components/molecules/Purified/Purified"
import formatDate from "app/features/shared/utils/formatDate"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const CaseDetailScratchpad: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData || !caseData.statements.length) {
    return null
  }

  const statements = caseData.statements.reduce((acc: any, statement, index, arr) => {
    acc.push([ "Toezichthouder", <strong className="anonymous">{ statement.user }</strong> ])
    acc.push([ "Datum", formatDate(statement.date, true) ])
    acc.push(<Purified className="anonymous" text={ replaceNewLines(replaceUrls(statement.statement)) } />)

    if (index < arr.length - 1) {
      acc.push(<Hr />)
    }

    return acc
  }, [])

  return (
    <CaseDetailSection
      title="Kladblok"
      dataSource="BWV"
      data={ statements }
    />
  )
}

export default CaseDetailScratchpad
