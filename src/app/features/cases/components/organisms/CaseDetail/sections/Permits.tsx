import React, { FC } from "react"
import { PermitsOverview } from "@amsterdam/wonen-ui"
import { useDecos, useCase } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { HrWide } from "../CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useDecos(bagId!, { lazy: !bagId })

  return (
    <CaseDetailSection
      id="vergunningen"
      title="Vergunningen"
      dataSource="Decos"
      isBusy={ isBusy }
    >
      <PermitsOverview
        permits={ decos?.permits || [] }
        loading={ isBusy }
        hasRowsSeperated={ false }
      />
      <HrWide />
    </CaseDetailSection>
  )
}

export default Permits
