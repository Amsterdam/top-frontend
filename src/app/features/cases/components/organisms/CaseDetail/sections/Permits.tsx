import React, { FC } from "react"
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { Grid, HrWide } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
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

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: permits, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

  const PermitDetails: Record<string, string> = {
    ADDRESS: "Locatie",
    APPLICANT: "Aangevraagd door",
    DATE_DECISION: "Datum besluit",
    DATE_VALID_FROM: "Geldig per",
    DATE_VALID_TO: "Geldig tot",
    DATE_VALID_UNTIL: "Geldig tot en met",
    HOLDER: "Vergunninghouder",
    PERMIT_NAME: "Naam vergunning",
    PERMIT_TYPE: "Soort Vergunning",
    RESULT: "Resultaat",
    SUBJECT: "Omschrijving",
    TEXT9: "Soort vergunning"
  }

  const validPermits = permits?.filter(permit => permit.permit_granted === "True") || []

  return (
    <CaseDetailSection
      title="Vergunningen"
      dataSource="Decos JOIN"
      experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos JOIN."
      isBusy={ isBusy }
    >
      { validPermits.map(((permit, index) => (
          <React.Fragment key={ permit.permit_type }>
            <Heading forwardedAs="h4">{ permit.permit_type }</Heading>
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
            { (index < validPermits.length - 1) && <HrWide /> }
          </React.Fragment>
        ))
      )
      }
    </CaseDetailSection>
  )
}

export default Permits
