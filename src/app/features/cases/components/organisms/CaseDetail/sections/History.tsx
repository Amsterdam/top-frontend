import { EventsTimeline, CaseEvent } from "@amsterdam/wonen-ui"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"
import { useCaseEvents } from "app/state/rest"

type Props = {
  caseId: string
}

const History: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId)

  return (
    <CaseDetailSection title="Zaakhistorie" dataSource="AZA">
      { data !== undefined &&
        <EventsTimeline
          events={ data as CaseEvent[] }
          spacingHorizontal={ 3 }
          hasTransparentBackground={ true }
        />
      }
    </CaseDetailSection>
  )
}

export default History
