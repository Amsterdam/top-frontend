import React, { FC } from "react"

import { useCase, useDaySettings, useAllPermitCheckmarks } from "app/state/rest"
import { BrkData } from "app/features/types"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const bagId = (caseData?.brk_data as BrkData).bag_id ?? ""
  const { data: permitCheckmarks } = useAllPermitCheckmarks(bagId, { lazy: !bagId })

  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)

  if (!caseData || !daySettings?.team_settings?.show_vakantieverhuur) {
    return null
  }

  const permits = [
    [ "has_b_and_b_permit", permitCheckmarks.has_b_and_b_permit ],
    [ "has_ligplaats_permit", permitCheckmarks.has_ligplaats_permit ],
    [ "has_omzettings_permit", permitCheckmarks.has_omzettings_permit ],
    [ "has_samenvoeging_permit", permitCheckmarks.has_samenvoeging_permit ],
    [ "has_splitsing_permit", permitCheckmarks.has_splitsing_permit ],
    [ "has_vacation_rental_permit", permitCheckmarks.has_vacation_rental_permit ],
    [ "has_woonvorming_permit", permitCheckmarks.has_woonvorming_permit ]
  ]

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ permits }
    />
  )
}

export default Permits
