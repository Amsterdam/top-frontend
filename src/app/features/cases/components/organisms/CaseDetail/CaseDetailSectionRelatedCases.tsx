import React, { FC } from "react"
import { Link } from "@amsterdam/asc-ui"

import { Case, RelatedCase } from "app/features/types"

import to from "app/features/shared/routing/to"

import Hr from "app/features/cases/components/atoms/Hr/Hr"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseCount: number
  caseId: string
  caseItem: Case
}

const CaseDetailSectionRelatedCases: FC<Props> = ({ caseCount, caseId, caseItem }) => {
  const relatedCases = caseItem.related_cases
    .filter(relatedCase => relatedCase.case_id !== caseId)
    .sort((a, b) => parseInt(a.case_number, 10) - parseInt(b.case_number, 10))
    .reduce((acc: any, relatedCase: RelatedCase, index, arr) => {
      const { case_id, case_number, case_reason } = relatedCase

      acc.push([ "Zaaknummer",
        <Link to={ to("/cases/:id", { id: case_id }) }>{ `${ case_number } van ${ caseCount }` }</Link> ])
      acc.push([ "Openingsreden", case_reason ])

      if (index < arr.length - 1) acc.push(<Hr />)
      return acc
    }, [])

  if (!relatedCases.length) {
    return <></>
  }

  return (
    <CaseDetailSection
      title="Andere open zaken op dit adres"
      data={ relatedCases }
    />
  )
}

export default CaseDetailSectionRelatedCases
