import React, { FC } from "react"
import { TimelineEvents } from "@amsterdam/wonen-ui"
import useGroupedCaseEvents from "../hooks/useGroupedCaseEvents"
import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"
import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  caseId: string
}

const Div = styled.div`
  >div[role="button"] {
    position: relative;
    margin: 0 -${ themeSpacing(3) } ${ themeSpacing(5) };
    padding: 0 ${ themeSpacing(3) };
    &:last-child {
      >div:nth-child(2) {
        >div:first-child {
          &:after {
            display: none;
          }
        }
      }
    }

    button {
      outline: none;
    }
  }
`

const Status: FC<Props> = ({ caseId }) => {
  const [timelineEvents] = useGroupedCaseEvents(caseId)

  return (
    <CaseDetailSection
      title="Status"
      dataSource="Zaaksysteem">
      { timelineEvents !== undefined && 
      <Div>
        <TimelineEvents items={ timelineEvents as any } />
      </Div>
      }
    </CaseDetailSection>
  )
}

export default Status
