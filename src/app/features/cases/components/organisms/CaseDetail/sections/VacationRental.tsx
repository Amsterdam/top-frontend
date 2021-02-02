import React, { FC } from "react"

import { useCase, usePermitCheckmarks, usePermitDetails } from "app/state/rest"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"
import isBetweenDates from "app/features/shared/utils/isBetweenDates"
import formatDateRange from "app/features/shared/utils/formatDateRange"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const VacationRental: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const bagId = getBagId(caseData!)
  const { data: permitCheckmarks } = usePermitCheckmarks(bagId!, { lazy: !bagId })
  const { data: permitDetails } = usePermitDetails(bagId!, { lazy: !bagId })

  if (!caseData) {
    return null
  }

  const permitVakantieVerhuur = permitDetails?.find(detail => detail.permit_type === "VAKANTIEVERHUUR")
  const permitBedAndBreakfast = permitDetails?.find(detail => detail.permit_type === "BED_AND_BREAKFAST")

  const notifiedRentals = caseData.vakantie_verhuur.notified_rentals
  const notified = notifiedRentals?.length

  const rentedDays = caseData.vakantie_verhuur.rented_days
  const rentedToday = notified ? notifiedRentals?.filter(r => isBetweenDates(new Date(r.check_in), new Date(r.check_out), new Date())).length : "–"
  const shortstay = caseData.vakantie_verhuur.shortstay === "J"

  return (
    <CaseDetailSection
      title="Vakantieverhuur"
      data={
        [
          permitDetails && [ "Vergunning", permitVakantieVerhuur ? `Ja, ${ formatDateRange(permitVakantieVerhuur) }` : "Nee" ],
          [ "Vandaag verhuurd", rentedToday ],
          [ `Nachten verhuurd ${ new Date().getFullYear() }`, rentedDays ?
            <ScrollToAnchor anchor="vakantieverhuur" text={ `${ rentedDays } nachten` } /> : "–" ],
          [ "Shortstay", shortstay ],
          permitCheckmarks && [ "B&B vergunning", permitBedAndBreakfast ? `Ja, ${ formatDateRange(permitBedAndBreakfast) }` : "Nee" ]
        ].filter(_ => !!_)
      }
    />
  )
}

export default VacationRental
