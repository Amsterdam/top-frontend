import React, { FC } from "react"

import { useCase, useDaySettings, useAllPermitCheckmarks } from "app/state/rest"
import { BrkData } from "app/features/types"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const VacationRental: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const bagId = (caseData?.brk_data as BrkData).bag_id ?? ""
  const { data: permitCheckmarks } = useAllPermitCheckmarks(bagId, { lazy: !bagId })

  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)

  if (!caseData || !daySettings?.team_settings?.show_vakantieverhuur) {
    return null
  }

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ Object.entries(permitCheckmarks || []) }
    />
  )
}

export default VacationRental
