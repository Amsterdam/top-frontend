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

  const address = getAddress(caseData?.import_adres ?? {} as ImportAdres)

  return (
    <>
      <CaseDetailSection
        title="Vergunningen"
        dataSource="Decos JOIN"
        experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
        isBusy={ isBusy }
      >
        <Label>Omzetting</Label>
        <Link to={ getToPermitDetailModalUrl() }>
          <Value>{ formatBoolean(permits?.has_omzettings_permit) }</Value>
        </Link>
        <Label>Splitsing</Label>
        <Value>{ formatBoolean(permits?.has_splitsing_permit) }</Value>
        <Label>Onttrekking, vorming en samenvoeging</Label>
        <Value>{ formatBoolean(permits?.has_ontrekking_vorming_samenvoeging_permit) }</Value>
        <Label>Ligplaats</Label>
        <Value>{ formatBoolean(permits?.has_ligplaats_permit) }</Value>
        <Label>Vakantieverhuur</Label>
        <Value>{ formatBoolean(permits?.has_vacation_rental_permit) }</Value>
        <Label>B&B</Label>
        <Value>{ formatBoolean(permits?.has_b_and_b_permit) }</Value>
        <PermitDetailsModal title={ address } />
      </CaseDetailSection>
    </>
  )
}

export default Permits
