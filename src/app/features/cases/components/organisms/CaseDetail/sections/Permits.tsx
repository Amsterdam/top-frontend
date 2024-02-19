import React from "react"
import { PermitsOverview, PermitsSynopsis } from "@amsterdam/wonen-ui"
import { useDecos, useCase, usePowerBrowser } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Permits: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy: loadingDecos } = useDecos(bagId!, { lazy: !bagId })
  const { data: powerbrowser, isBusy: loadingPowerBrowser } = usePowerBrowser(bagId!, { lazy: !bagId })

  const detailSection = [
    [ "Databron", "Decos" ],
    <PermitsOverview
        permits={ decos?.permits || [] }
        loading={ loadingDecos }
        horizontalBordered={ false }
      />,
    [ "Databron", "PowerBrowser" ],
    <PermitsSynopsis
      permits={ powerbrowser || [] }
      loading={ loadingPowerBrowser }
      horizontalBordered={ false }
    />
  ]

  return (
    <CaseDetailSection
      id="vergunningen"
      title="Vergunningen"
      data={ detailSection }
    />
  )
}

export default Permits
