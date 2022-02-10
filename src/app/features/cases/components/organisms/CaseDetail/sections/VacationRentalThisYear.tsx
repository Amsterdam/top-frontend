import React from "react"
import { HolidayRental } from "@amsterdam/wonen-ui"
import { useAllPermitCheckmarks, useCase, useDaySettings } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const VacationRentalThisYear: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

  if (!caseData || !daySettings?.team_settings?.show_vakantieverhuur) {
    return null
  }

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
