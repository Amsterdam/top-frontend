import React from "react"
import { HolidayRentalReports } from "@amsterdam/wonen-ui"
import { useCase, useMeldingen } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const VacationRentalThisYear: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: meldingen, isBusy } = useMeldingen(bagId!, { lazy: !bagId })

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title="Vakantieverhuur dit jaar"
      dataSource="Toeristischeverhuur.nl"
      isBusy={ isBusy }
    >
      <HolidayRentalReports
        data={ meldingen?.data || [] }
        loading={ isBusy }
      />
    </CaseDetailSection>
  )
}

export default VacationRentalThisYear
