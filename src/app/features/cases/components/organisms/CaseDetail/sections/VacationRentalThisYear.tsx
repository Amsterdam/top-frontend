import React from "react"
import { HolidayRental } from "@amsterdam/wonen-ui"
import { useDecos, useCase } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const VacationRentalThisYear: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useDecos(bagId!, { lazy: !bagId })

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title="Vakantieverhuur dit jaar"
      dataSource="Decos"
      isBusy={ isBusy }
    >
      <HolidayRental
        data={ decos?.vakantieverhuur_reports || [] }
        loading={ isBusy }
        hasRowsSeperated={ false }
        showRecentYearOnly={ true }
      />
    </CaseDetailSection>
  )
}

export default VacationRentalThisYear
