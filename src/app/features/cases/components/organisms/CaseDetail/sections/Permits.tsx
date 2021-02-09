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
    <CaseDetailSection
      title="Vergunningen"
      dataSource="Decos JOIN"
      experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
      isBusy={ isBusy }
    >
      { permits?.map((permit => (
        <React.Fragment key={ permit.permit_type }>
          <Label>{ permit.permit_type }</Label>
          <Value value={ formatBoolean(permit.permit_granted) } />
        </ React.Fragment>
      ))) }
      <div />
      <Link to={ getToPermitDetailModalUrl() }>
        Bekijk details
      </Link>
      <PermitDetailsModal title={ address } permits={ permits } />
    </CaseDetailSection>
  )
}

export default Permits
