import React, { FC } from "react"
import { Case } from "app/features/types"

import CaseDetailSectionGeneral from "./CaseDetailSectionGeneral"
import CaseDetailSectionLogbook from "./CaseDetailSectionLogbook"
import CaseDetailSectionRelatedCases from "./CaseDetailSectionRelatedCases"
import CaseDetailSectionResidence from "./CaseDetailSectionResidence"
import CaseDetailSectionResidents from "./CaseDetailSectionResidents"
import CaseDetailSectionScratchpad from "./CaseDetailSectionScratchpad"
import CaseDetailSectionSignal from "./CaseDetailSectionSignal"
import CaseDetailSectionStadia from "./CaseDetailSectionStadia"
import CaseDetailSectionVacationRental from "./CaseDetailSectionVacationRental"
import CaseDetailSectionVacationRentalThisYear from "./CaseDetailSectionVacationRentalThisYear"

type Props = {
  caseId: string
  caseItem: Case
}

const CaseDetail: FC<Props> = ({ caseId, caseItem }) => (
  <article className="CaseDetail">
    <CaseDetailSectionGeneral caseId={ caseId } />
    <CaseDetailSectionRelatedCases caseId={ caseId } />
    <CaseDetailSectionVacationRental caseId={ caseId } />
    <CaseDetailSectionResidence caseId={ caseId } />
    <CaseDetailSectionSignal caseId={ caseId } />
    <CaseDetailSectionResidents caseId={ caseId } />
    <CaseDetailSectionVacationRentalThisYear caseId={ caseId } />
    <CaseDetailSectionLogbook caseId={ caseId } />
    <CaseDetailSectionScratchpad caseId={ caseId } />
    <CaseDetailSectionStadia caseId={ caseId } />
  </article>
)

export default CaseDetail
