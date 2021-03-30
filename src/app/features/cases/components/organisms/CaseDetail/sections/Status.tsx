import React, { FC } from "react"
import { TimelineEvents } from "@amsterdam/wonen-ui"
import useGroupedCaseEvents from "../hooks/useGroupedCaseEvents"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseId: string
}

const Status: FC<Props> = ({ caseId }) => {
  // const { data } = useCaseEvents(caseId)
  const [timelineEvents] = useGroupedCaseEvents(caseId)
  console.log("useCaseEvents", timelineEvents)

  return (
    <CaseDetailSection
      title="Status"
      dataSource="Zaaksysteem">
      { timelineEvents !== undefined && <TimelineEvents items={ timelineEvents as any } />}
    </CaseDetailSection>
  )
}

export default Status
