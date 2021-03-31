import React, { FC } from "react"
import { useParams } from "@reach/router"
import styled from "styled-components"

import { useItinerary } from "app/state/rest/custom/useItinerary"

import General from "./sections/General"
import Logbook from "./sections/Logbook"
import RelatedCases from "./sections/RelatedCases"
import Residence from "./sections/Residence"
import Residents from "./sections/Residents"
import Scratchpad from "./sections/Scratchpad"
import Signal from "./sections/Signal"
import Stadia from "./sections/Stadia"
import Status from "./sections/Status"
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

const CaseDetail: FC<Props> = ({ caseId }) => {
  const { itineraryId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId)

  const useZakenBackend = itinerary?.settings.day_settings.team_settings.use_zaken_backend

  return (
    <Article>
      <General caseId={ caseId } />
      {/* TODO Move to bottom when finished. */}
       { useZakenBackend
        ? <Status caseId={ caseId } />
        : <Stadia caseId={ caseId } />
      }
      {/* TODO Remove when switch is working */}
      <Status caseId={ caseId } />
      <RelatedCases caseId={ caseId } />
      <Residence caseId={ caseId } />
      <Signal caseId={ caseId } />
      <Residents caseId={ caseId } />
      <Permits caseId={ caseId } />
      <VacationRentalThisYear caseId={ caseId } />
      <Logbook caseId={ caseId } />
      <Scratchpad caseId={ caseId } />
    </Article>
  )
}

export default CaseDetail
