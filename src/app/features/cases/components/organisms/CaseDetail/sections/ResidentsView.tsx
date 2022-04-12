import { Residents } from "@amsterdam/wonen-ui"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"
import { useResidents } from "app/state/rest"

type Props = {
  bagId: string
}

const ResidentsView: React.FC<Props> = ({ bagId }) => {
  const { data, isBusy } = useResidents(bagId)

  return (
    <CaseDetailSection title="Ingeschreven personen" dataSource="BRP">
      <Residents data={ data } loading={ isBusy } />
    </CaseDetailSection>
  )
}

export default ResidentsView
