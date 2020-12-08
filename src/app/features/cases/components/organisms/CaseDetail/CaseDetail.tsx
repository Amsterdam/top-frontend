import React, { FC } from "react"
import { Case } from "app/features/types"

import CaseDetailSectionGeneral from "./CaseDetailSectionGeneral"
import CaseDetailSectionRelatedCases from "./CaseDetailSectionRelatedCases"
import CaseDetailSectionResidence from "./CaseDetailSectionResidence"
import CaseDetailSectionResidents from "./CaseDetailSectionResidents"
import CaseDetailSectionScratchpad from "./CaseDetailSectionScratchpad"
import CaseDetailSectionSignal from "./CaseDetailSectionSignal"
import CaseDetailSectionStadia from "./CaseDetailSectionStadia"
import CaseDetailSectionVacationRental from "./CaseDetailSectionVacationRental"
import CaseDetailSectionVacationRentalThisYear from "./CaseDetailSectionVacationRentalThisYear"
import CaseLogBook from "../CaseLogbook/CaseLogBook"

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
    <CaseLogBook caseId={ caseId } />
    <CaseDetailSectionScratchpad caseId={ caseId } />
    <CaseDetailSectionStadia caseId={ caseId } />
  </article>
)

export default CaseDetail
