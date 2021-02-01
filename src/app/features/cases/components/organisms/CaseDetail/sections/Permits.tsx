import React, { FC } from "react"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatBoolean from "app/features/shared/utils/formatBoolean"

import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const { data: permitCheckmarks } = useAllPermitCheckmarks(caseId, { lazy: !caseId })

  if (!caseData || !permitCheckmarks) {
    return null
  }

  const permitData = [
    [ "Omzetting", formatBoolean(permitCheckmarks.has_omzettings_permit) ],
    [ "Splitsing", formatBoolean(permitCheckmarks.has_splitsing_permit) ],
    [ "Onttrekking, vorming en samenvoeging", formatBoolean(permitCheckmarks.has_ontrekking_vorming_samenvoeging_permit) ],
    [ "Ligplaats", formatBoolean(permitCheckmarks.has_ligplaats_permit) ],
    [ "Vakantieverhuur", formatBoolean(permitCheckmarks.has_vacation_rental_permit) ],
    [ "B&B", formatBoolean(permitCheckmarks.has_b_and_b_permit) ]
  ]

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ permitData }
      experimental
    />
  )
}

export default Permits
