import React from "react"
import {
  HolidayRentalReports,
  HolidayRentalRegistrations,
  HolidayRentalReport
} from "@amsterdam/wonen-ui"
import { useCase, useMeldingen, useRegistrations } from "app/state/rest"
import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import styled from "styled-components"

type Props = {
  caseId: string
}

const Wrapper = styled.div`
  margin-bottom: 32px;
`

const HolidayRental: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)

  const { data: registrations, isBusy: isBusyRegistrations } = useRegistrations(bagId!, { lazy: !bagId })
  const { data: meldingen, isBusy: isBusyMeldingen } = useMeldingen(bagId!, { lazy: !bagId })

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title="Vakantieverhuur"
      dataSource="Toeristischeverhuur.nl"
    >
      <Wrapper>
        <HolidayRentalRegistrations
          data={registrations || []}
          loading={isBusyRegistrations}
          loadingRows={3}
          horizontalBordered={false}
        />
      </Wrapper>

      <HolidayRentalReports
        data={(meldingen?.data || []) as HolidayRentalReport[]}
        loading={isBusyMeldingen}
        loadingRows={3}
        horizontalBordered={false}
      />
    </CaseDetailSection>
  )
}

export default HolidayRental
