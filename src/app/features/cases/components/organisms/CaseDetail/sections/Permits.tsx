import React, { FC } from "react"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatBoolean from "app/features/shared/utils/formatBoolean"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: permits, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

  const permitData = [
    [ "Omzetting", formatBoolean(permits?.has_omzettings_permit) ],
    [ "Splitsing", formatBoolean(permits?.has_splitsing_permit) ],
    [ "Onttrekking, vorming en samenvoeging", formatBoolean(permits?.has_ontrekking_vorming_samenvoeging_permit) ],
    [ "Ligplaats", formatBoolean(permits?.has_ligplaats_permit) ],
    [ "Vakantieverhuur", formatBoolean(permits?.has_vacation_rental_permit) ],
    [ "B&B", formatBoolean(permits?.has_b_and_b_permit) ]
  ]

  return (
    <>
      <CaseDetailSection
        title="Vergunningen"
        dataSource="Decos JOIN"
        data={ permitData }
        experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
        isBusy={ isBusy }
      />
    </>
  )
}

export default Permits
