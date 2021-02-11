import React, { FC } from "react"

import General from "./sections/General"
import Logbook from "./sections/Logbook"
import RelatedCases from "./sections/RelatedCases"
import Residence from "./sections/Residence"
import Residents from "./sections/Residents"
import Scratchpad from "./sections/Scratchpad"
import Signal from "./sections/Signal"
import Stadia from "./sections/Stadia"
import Permits from "./sections/Permits"
import VacationRentalThisYear from "./sections/VacationRentalThisYear"

type Props = {
  caseId: string
}

const CaseDetail: FC<Props> = ({ caseId }) => (
  <article className="CaseDetail">
    <General caseId={ caseId } />
    <RelatedCases caseId={ caseId } />
    <Residence caseId={ caseId } />
    <Signal caseId={ caseId } />
    <Residents caseId={ caseId } />
    <Permits caseId={ caseId } />
    <VacationRentalThisYear caseId={ caseId } />
    <Logbook caseId={ caseId } />
    <Scratchpad caseId={ caseId } />
    <Stadia caseId={ caseId } />
  </article>
)

export default CaseDetail
