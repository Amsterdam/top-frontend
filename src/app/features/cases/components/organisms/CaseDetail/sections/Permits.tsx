import React, { FC } from "react"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import { BrkData } from "app/features/types"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  const bagId = (caseData?.brk_data as BrkData).bag_id ?? ""
  const { data: permitCheckmarks } = useAllPermitCheckmarks(bagId, { lazy: !bagId })

  if (!permitCheckmarks) {
    return null
  }

  const permits = [
    [ "Omzetting", permitCheckmarks.has_omzettings_permit ],
    [ "Splitsing", permitCheckmarks.has_splitsing_permit ],
    [ "Woonvorming", permitCheckmarks.has_woonvorming_permit ],
    [ "Samenvoeging", permitCheckmarks.has_samenvoeging_permit ],
    [ "Ligplaats", permitCheckmarks.has_ligplaats_permit ],
    [ "Vakantieverhuur", permitCheckmarks.has_vacation_rental_permit ],
    [ "B&B", permitCheckmarks.has_b_and_b_permit ]
  ]

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ permits }
    />
  )
}

export default Permits
