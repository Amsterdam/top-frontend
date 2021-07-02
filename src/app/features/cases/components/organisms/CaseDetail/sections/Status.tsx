import { EventsTimeline } from "@amsterdam/wonen-ui"
import useGroupedCaseEvents from "../hooks/useGroupedCaseEvents"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

type Props = {
  caseId: string
}

const Status: React.FC<Props> = ({ caseId }) => {
  const [timelineEvents] = useGroupedCaseEvents(caseId)

  return (
    <CaseDetailSection
      title="Status"
      dataSource="AZA"
      >
      { timelineEvents !== undefined &&
        <EventsTimeline
          items={ timelineEvents as any }
          spacingHorizontal={ 3 }
          useTransparentBackground={ true }
        />
      }
    </CaseDetailSection>
  )
}

export default Status
