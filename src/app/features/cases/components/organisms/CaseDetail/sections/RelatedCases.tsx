import React, { FC } from "react"
import { Link } from "@reach/router"

import { useCase } from "app/state/rest"
import { RelatedCase } from "app/features/types"
import to from "app/features/shared/routing/to"

import { getCaseCount } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const RelatedCases: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData) {
    return null
  }

  const otherCases = caseData.related_cases.filter(relatedCase => relatedCase.case_id !== caseId)

  if (!otherCases.length) {
    return null
  }

  const relatedCases = [ ...otherCases ]
    .sort((a, b) => parseInt(a.case_number, 10) - parseInt(b.case_number, 10))
    .reduce((acc: any, relatedCase: RelatedCase, index, arr) => {
      const { case_id, case_number, case_reason } = relatedCase

      acc.push([ "Zaaknummer",
        <Link to={ to("/cases/:id", { id: case_id }) }>{ `${ case_number } van ${ getCaseCount(caseData) }` }</Link> ])
      acc.push([ "Openingsreden", case_reason ])

      if (index < arr.length - 1) acc.push(<Hr />)
      return acc
    }, [])

  return (
    <CaseDetailSection
      title="Andere open zaken op dit adres"
      data={ relatedCases }
    />
  )
}

export default RelatedCases
