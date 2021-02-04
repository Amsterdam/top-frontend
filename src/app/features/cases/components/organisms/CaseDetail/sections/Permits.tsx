import React, { FC } from "react"
import { Link } from "@reach/router"

import { ImportAdres } from "app/features/types"
import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import formatBoolean from "app/features/shared/utils/formatBoolean"
import { usePermitDetailsModal } from "app/features/cases/components/organisms/PermitDetail/hooks/usePermitDetailsModal"

import { getAddress, getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import PermitDetailsModal from "app/features/cases/components/organisms/PermitDetail/PermitDetailsModal"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: permits, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })
  const { getUrl: getToPermitDetailModalUrl } = usePermitDetailsModal()

  const permitsLookup = (permitType: string) => permits?.reduce((a: any, c) => {
    a[c.permit_type] = c
    return a
  }, {})[permitType] || "UNKNOWN"

  const permitGranted = (permitType: string) => formatBoolean(permitsLookup(permitType).permit_granted)

  const address = getAddress(caseData?.import_adres ?? {} as ImportAdres)

  return (
    <CaseDetailSection
      title="Vergunningen"
      dataSource="Decos JOIN"
      experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
      isBusy={ isBusy }
    >
      <Label>Omzetting</Label>
      <Value>{ permitGranted("OMZETTINGSVERGUNNING") }</Value>
      <Label>Splitsing</Label>
      <Value>{ permitGranted("SPLITTINGSVERGUNNING") }</Value>
      <Label>Onttrekking, vorming en samenvoeging</Label>
      <Value>{ permitGranted("ONTREKKING_VORMING_SAMENVOEGING_VERGUNNINGEN") }</Value>
      <Label>Ligplaats</Label>
      <Value>{ permitGranted("LIGPLAATSVERGUNNING") }</Value>
      <Label>Vakantieverhuur</Label>
      <Value>{ permitGranted("VAKANTIEVERHUURVERGUNNING") }</Value>
      <Label>B&B</Label>
      <Value>{ permitGranted("B_EN_B_VERGUNNING") }</Value>
      <div />
      <Link to={ getToPermitDetailModalUrl() }>
        Bekijk details
      </Link>
      <PermitDetailsModal title={ address } permits={ permits } />
    </CaseDetailSection>
  )
}

export default Permits
