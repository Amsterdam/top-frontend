import React, { FC } from "react"
import styled from "styled-components"

import { useCase } from "app/state/rest"

import General from "./sections/General"
import Logbook from "./sections/Logbook"
import Residence from "./sections/Residence"
import Permits from "./sections/Permits"
import ResidentsView from "./sections/ResidentsView"
import History from "./sections/History"
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

const CaseDetail: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = caseData?.address?.bag_id

  return (
    <Article>
      <General caseId={ caseId } />
      <Residence caseId={ caseId } />
      { bagId && <ResidentsView bagId={ bagId } /> }
      <Permits caseId={ caseId } />
      <VacationRentalThisYear caseId={ caseId } />
      <Logbook caseId={ caseId } />
      <History caseId={ caseId } />
    </Article>
  )
}

export default CaseDetail
