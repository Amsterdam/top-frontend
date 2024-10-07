import React from "react"
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { CaseIdDisplay } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import { getAddress } from "../utils"
import {
  StyledAnchor,
  Grid,
  Section,
  SectionRow
} from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"
import Tag from "app/features/shared/components/atoms/Tag/Tag"

type Props = {
  caseId: string
}

const PostalCode = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`

const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${ themeSpacing(2) };
  gap: ${ themeSpacing(2) };
`

const General: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData) {
    return null
  }

  const address = getAddress(caseData.address)
  const postalCode = caseData.address.postal_code

  const hasPriority = (caseData.schedules && caseData.schedules[0]?.priority?.weight >= 0.5) ?? false
  const hasWarrant = (caseData.schedules && caseData.schedules[0]?.priority?.weight >= 1.0) ?? false
  const lastStadiumLabel = caseData.workflows?.length > 0 ? caseData.workflows[0].state.name : undefined
  const hasProject = caseData?.project?.name !== undefined

  return (
    <Section>
      <SectionRow>
        <Heading>{ address }</Heading>
        <PostalCode>{ postalCode }</PostalCode>
        <BadgesRow>
          { lastStadiumLabel && <StadiumBadge stadium={ lastStadiumLabel! } /> }
          { hasPriority && <StadiumBadge stadium="Prio" variant="secondary" /> }
          { hasWarrant && <StadiumBadge stadium="Machtiging" variant="tint" /> }
          { caseData?.tags?.map((tag)=> <Tag key={ tag.id } color="rgb(255, 145, 0)">{ tag.name }</Tag>)}
        </BadgesRow>
        <Grid>
          <Label>Zaak ID</Label>
          <Value><CaseIdDisplay id={ caseData.id } /></Value>
          { caseData?.reason && (
            <>
              <Label>Aanleiding</Label>
              <Value>{ caseData?.reason?.name }{ hasProject ? ": " : "" }{ hasProject ? caseData?.project?.name : "" }</Value>
            </>
          )}
          { caseData?.subjects && caseData?.subjects.length > 0 && (
            <>
              <Label>Onderwerpen</Label>
              <Value>{ caseData?.subjects.map((subject: { name: string }) => subject.name).join(", ") }</Value>
            </>
          )}
        </Grid>
      </SectionRow>
      <SectionRow>
        <StyledAnchor
          href={ `https://www.google.com/maps/place/${ address }, Amsterdam` }
          target="_blank"
          rel="noopener noreferrer"
        >
          Bekijk op Google Maps
        </StyledAnchor>
      </SectionRow>
    </Section>
  )
}

export default General
