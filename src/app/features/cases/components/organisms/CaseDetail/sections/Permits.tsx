import React, { FC } from "react"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatBoolean from "app/features/shared/utils/formatBoolean"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: permits, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

  return (
    <>
      <CaseDetailSection
        title="Vergunningen"
        dataSource="Decos JOIN"
        experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
        isBusy={ isBusy }
      >
        <Label>Omzetting</Label>
        <Value>{ formatBoolean(permits?.has_omzettings_permit) }</Value>
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
      </CaseDetailSection>
    </>
  )
}

export default Permits
