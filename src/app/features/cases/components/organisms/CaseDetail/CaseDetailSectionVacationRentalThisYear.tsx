import React, { FC } from "react"

import { Case } from "app/features/types"

import formatDate from "app/features/shared/utils/formatDate"
import Hr from "app/features/cases/components/atoms/Hr/Hr"

import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseItem: Case
}

const CaseDetailSectionVacationRentalThisYear: FC<Props> = ({ caseItem }) => {
  const notifiedRentals = caseItem.vakantie_verhuur.notified_rentals
  const rentedDays = caseItem.vakantie_verhuur.rented_days

  if (!notifiedRentals.length) {
    return <></>
  }

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title={ `Vakantieverhuur dit jaar (${ rentedDays })` }
      data={
        [ ...notifiedRentals ] // reverse is mutable
          .reverse()
          .map((o: {check_in: string, check_out: string}) => [ [ "Check out", formatDate(o.check_out) ], [ "Check in", formatDate(o.check_in) ],
            <Hr /> ])
          .flat(1)
          .slice(0, -1) // remove last Hr
      }
    />
  )
}

export default CaseDetailSectionVacationRentalThisYear
