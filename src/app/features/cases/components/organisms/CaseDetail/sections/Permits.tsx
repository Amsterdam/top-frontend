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
  const permitsLookup = (permitType: string) => (permits?.reduce((a: any, c) => {
    a[c.permit_type] = c
    return a
  }, {})[permitType]) || "UNKNOWN"

  const permitData = [
    [ "Omzetting", formatBoolean(permitsLookup("OMZETTINGSVERGUNNING").permit_granted) ],
    [ "Splitsing", formatBoolean(permitsLookup("SPLITTINGSVERGUNNING").permit_granted) ],
    [ "Onttrekking, vorming en samenvoeging", formatBoolean(permitsLookup("ONTREKKING_VORMING_SAMENVOEGING_VERGUNNINGEN").permit_granted) ],
    [ "Ligplaats", formatBoolean(permitsLookup("LIGPLAATSVERGUNNING").permit_granted) ],
    [ "Vakantieverhuur", formatBoolean(permitsLookup("VAKANTIEVERHUURVERGUNNING").permit_granted) ],
    [ "B&B", formatBoolean(permitsLookup("B_EN_B_VERGUNNING").permit_granted) ]
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
