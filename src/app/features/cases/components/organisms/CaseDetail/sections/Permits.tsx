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
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"
import isBetweenDates from "app/features/shared/utils/isBetweenDates"

type Props = {
  caseId: string
}

const Details = styled.details`
  margin-top: ${ themeSpacing(4) };
`

const Summary = styled.summary`
  margin-bottom: ${ themeSpacing(4) };
`

const TwoColumns = styled.span`
  grid-column: span 2;
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
    PERMIT_TYPE: "Soort vergunning",
    RESULT: "Resultaat",
    SUBJECT: "Omschrijving",
    TEXT9: "Soort vergunning"
  }

  const foundPermits = permits?.filter(permit => [ "True", "False" ].includes(permit.permit_granted)) || []

  const notifiedRentals = caseData?.vakantie_verhuur.notified_rentals
  const notified = notifiedRentals?.length

  const rentedDays = caseData?.vakantie_verhuur.rented_days
  const rentedToday = notified ? notifiedRentals?.filter(r => isBetweenDates(new Date(r.check_in), new Date(r.check_out), new Date())).length : "–"

  // const permitDetails =

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ [
        [ "Databron", "BWV" ],
        [ "Shortstay", caseData?.vakantie_verhuur.shortstay === "J" ]
      ] }
      dataSource="Decos"
      experimental="Let op: we werken momenteel aan het ophalen en tonen van vergunningen. Controleer voorlopig zelf of deze overeenkomen met de gegevens in Decos."
      isBusy={ isBusy }
    >
      { foundPermits.length ? foundPermits.map(((permit, index) => (
          <React.Fragment key={ permit.permit_type }>
            <Heading forwardedAs="h4">{ permit.permit_type }</Heading>
            <Grid>
              <Label>Conclusie TOP</Label>
              <Value value={ permit.permit_granted === "True" ? "Geldig" : "Niet geldig" } />
              <Label>Resultaat</Label>
              <Value value={ permit.details.RESULT } />
              { Object.keys(permit.details).length
                ? Object.entries(permit.details).map(([ key, value ]) => (key !== "RESULT") ? (
                  <React.Fragment key={ key }>
                    <Label>{ PermitDetails[key] || "key" }</Label>
                    <Value value={ key.startsWith("DATE_") ? formatDate(String(value)) : value } />
                  </React.Fragment>
                ) : null)
                :
                <TwoColumns>Geen details gevonden.</TwoColumns>
              }
              { permit.permit_type === "Vakantieverhuur" &&
              <>
                <Label>Vandaag verhuurd</Label>
                <Value value={ rentedToday } />
                <Label>Nachten verhuurd { new Date().getFullYear() }</Label>
                <Value>
                  { rentedDays ? <ScrollToAnchor anchor="vakantieverhuur" text={ `${ rentedDays } nachten` } /> : "–" }
                </Value>
              </>
              }
            </Grid>
            { permit.raw_data &&
            <Details>
              <Summary>Alle informatie</Summary>
              <Grid>
                { Object.keys(permit.raw_data).length
                  ? Object.entries(permit.raw_data).sort().map(([ key, value ]) => (
                    <React.Fragment key={ key }>
                      <Label>{ key }</Label>
                      <Value value={ value } />
                    </React.Fragment>
                  ))
                  : <TwoColumns>Geen informatie gevonden.</TwoColumns>
                }
              </Grid>
            </Details>
            }
            { (index < foundPermits.length - 1) && <HrWide /> }
          </React.Fragment>
        ))
        ) :
        <TwoColumns>{ isBusy ? "Vergunningen ophalen…" : "Geen vergunningen gevonden." }</TwoColumns>
      }
      <HrWide />
    </CaseDetailSection>
  )
}

export default Permits
