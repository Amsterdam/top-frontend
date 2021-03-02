import React, { FC } from "react"
import styled from "styled-components"

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

const Article = styled.article`
  @media (min-width: 60rem) {
    columns: 2;
  }

  @media (min-width: 90rem) {
    columns: 3;
  }

  @media (min-width: 120rem) {
    columns: 4;
  }

  @media (min-width: 150rem) {
    columns: 5;
  }
`

const CaseDetail: FC<Props> = ({ caseId }) => (
  <Article>
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
  </Article>
)

export default CaseDetail
