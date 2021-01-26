import React, { FC } from "react"
import { Heading } from "@amsterdam/asc-ui"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"
import isBetweenDates from "app/features/shared/utils/isBetweenDates"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "../CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const { data: permitCheckmarks } = useAllPermitCheckmarks(caseId, { lazy: !caseId })

  if (!caseData || !permitCheckmarks) {
    return null
  }

  const today = new Date()
  const notifiedRentals = caseData.vakantie_verhuur.notified_rentals
  const notified = notifiedRentals?.length
  const rentedDays = caseData.vakantie_verhuur.rented_days
  const rentedToday = notified ? notifiedRentals?.filter(r => isBetweenDates(new Date(r.check_in), new Date(r.check_out), today)).length : "Nee"
  const shortstay = caseData.vakantie_verhuur.shortstay === "J"
  const permitReadeableAnwser = (p: string) => (p === "True" ? "Ja" : p === "False" ? "Nee" : "Onbekent")

  const permits = [
    [ "Omzetting", permitReadeableAnwser(permitCheckmarks.has_omzettings_permit) ],
    [ "Splitsing", permitReadeableAnwser(permitCheckmarks.has_splitsing_permit) ],
    [ "Onttrekking- vorming en samenvoeging", permitReadeableAnwser(permitCheckmarks.has_ontrekking_vorming_samenvoeging_permit) ],
    [ "Ligplaats", permitReadeableAnwser(permitCheckmarks.has_ligplaats_permit) ],
    [ "Vakantieverhuur", permitReadeableAnwser(permitCheckmarks.has_vacation_rental_permit) ],
    [ "B&B", permitReadeableAnwser(permitCheckmarks.has_b_and_b_permit) ],
    [ "Shortstay", shortstay ],
    <Hr />,
    <Heading forwardedAs="h4">Vakantieverhuur</Heading>,
    [ "Verhuurd vandaag", rentedToday ],
    [ `Verhuurd ${ today.getFullYear() }`, rentedDays ?
      <ScrollToAnchor anchor="vakantieverhuur" text={ `${ rentedDays } nachten` } /> : "0 nachten" ]
  ]

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ permits }
    />
  )
}

export default Permits
