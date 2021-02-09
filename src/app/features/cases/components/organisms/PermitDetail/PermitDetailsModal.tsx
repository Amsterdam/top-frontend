import React from "react"
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { permitType } from "app/state/rest"
import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import formatDate from "app/features/shared/utils/formatDate"

import { Grid, HrWide, SourceInfo } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"
import { usePermitDetailsModal } from "./hooks/usePermitDetailsModal"

type Props = {
  title: string
  permits?: permitType[]
}

const TwoColumns = styled.span`
  grid-column: span 2;
`

const Details = styled.details`
  margin-top: ${ themeSpacing(4) };
`

const Summary = styled.summary`
  margin-bottom: ${ themeSpacing(4) };
`

const PermitDetailsModal: React.FC<Props> = ({ title, permits }) => {
  const { shouldShow } = usePermitDetailsModal()

  if (!shouldShow) {
    return null
  }

  const PermitDetails: Record<string, string> = {
    APPLICANT: "Aangevraagd door",
    DATE_DECISION: "Datum besluit",
    DATE_VALID_FROM: "Geldig per",
    DATE_VALID_TO: "Geldig tot",
    DATE_VALID_UNTIL: "Geldig tot en met",
    HOLDER: "Vergunninghouder",
    PERMIT_NAME: "Vergunning",
    RESULT: "Resultaat",
    SUBJECT1: "Omschrijving",
    TEXT9: "Soort vergunning",
    TEXT44: "BAG-id"
  }

  return (
    <DefaultModal title={ title }>
      <SourceInfo>Bron: Decos JOIN</SourceInfo>
      <HrWide />
      { permits?.map((permit) => (
          <section key={ permit.permit_type }>
            <Heading forwardedAs="h3">{ permit.permit_type }</Heading>
            <Grid>
              { permit.details
                ? Object.entries(permit.details).map(([ key, value ]) => (
                  <React.Fragment key={ key }>
                    <Label>{ PermitDetails[key] || "key" }</Label>
                    <Value value={ key.startsWith("DATE_") ? formatDate(String(value)) : value } />
                  </React.Fragment>
                ))
                : <TwoColumns>Geen details gevonden.</TwoColumns>
              }
            </Grid>
            { permit.raw_data &&
            <Details>
              <Summary>Alle informatie</Summary>
              <Grid>
                { permit.raw_data ?
                  Object.entries(permit.raw_data).sort().map(([ key, value ]) => (
                    <React.Fragment key={ key }>
                      <Label>{ key }</Label>
                      <Value value={ value } />
                    </React.Fragment>
                  ))
                  : <TwoColumns>Geen verdere informatie gevonden.</TwoColumns>
                }
              </Grid>
            </Details>
            }
            <HrWide />
          </section>
        )
      ) }
    </DefaultModal>)
}

export default PermitDetailsModal
