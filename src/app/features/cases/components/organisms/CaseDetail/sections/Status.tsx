import { FC } from "react"
import { TimelineEvents } from "@amsterdam/wonen-ui"
import useGroupedCaseEvents from "../hooks/useGroupedCaseEvents"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseId: string
}

const Status: FC<Props> = ({ caseId }) => {
  const [ timelineEvents ] = useGroupedCaseEvents(caseId)

  return (
    <CaseDetailSection
      title="Status"
      dataSource="Zaaksysteem">
      { timelineEvents !== undefined &&
        <TimelineEvents items={ timelineEvents as any } spacingHorizontal={3} useTransparentBackground={true} />
      }
    </CaseDetailSection>
  )
}

export default Status
