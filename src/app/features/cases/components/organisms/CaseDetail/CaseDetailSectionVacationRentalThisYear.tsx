import React, { FC } from "react"

import { useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import Hr from "app/features/cases/components/atoms/Hr/Hr"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseId: string
}

const CaseDetailSectionVacationRentalThisYear: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const notifiedRentals = caseData?.vakantie_verhuur.notified_rentals
  const rentedDays = caseData?.vakantie_verhuur.rented_days

  if (!notifiedRentals?.length) {
    return null
  }

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title={ `Vakantieverhuur dit jaar (${ rentedDays })` }
      data={
        [ ...notifiedRentals ] // reverse is mutable
          .reverse()
          .map((o: { check_in: string, check_out: string }) => [ [ "Check out", formatDate(o.check_out) ], [ "Check in", formatDate(o.check_in) ],
            <Hr /> ])
          .flat(1)
          .slice(0, -1) // remove last Hr
      }
    />
  )
}

export default CaseDetailSectionVacationRentalThisYear
