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

  const foundPermits = permits?.filter(permit => [ "True", "False" ].includes(permit.permit_granted)) || []

  const notifiedRentals = caseData?.vakantie_verhuur.notified_rentals
  const notified = notifiedRentals?.length

  const rentedDays = caseData?.vakantie_verhuur.rented_days
  const rentedToday = notified ? notifiedRentals?.filter(r => isBetweenDates(new Date(r.check_in), new Date(r.check_out), new Date())).length : "–"

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
              <Label>Omschrijving zaak</Label>
              <Value value={ permit.details.SUBJECT } />
              { permit.permit_type.startsWith("B&B") &&
              <>
                <Label>Soort vergunning</Label>
                <Value value={ permit.details.PERMIT_TYPE } />
              </>
              }
              <Label>Aangevraagd door</Label>
              <Value value={ permit.details.APPLICANT } />
              { permit.permit_type.startsWith("B&B") &&
              <>
                <Label>Vergunninghouder</Label>
                <Value value={ permit.details.HOLDER } />
              </>
              }
              <Label>Locatie</Label>
              <Value value={ permit.details.ADDRESS } />
              { permit.permit_granted === "True" &&
              <>
                <Label>Verleend per</Label>
                <Value value={ formatDate(permit.details.DATE_VALID_FROM) } />
                { permit.permit_type.startsWith("B&B") ?
                  <>
                    <Label>Geldig tot en met</Label>
                    <Value value={ formatDate(permit.details.DATE_VALID_UNTIL) } />
                  </> :
                  <>
                    <Label>Geldig tot</Label>
                    <Value value={ formatDate(permit.details.DATE_VALID_TO) } />
                  </>
                }
              </>
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
              { permit.permit_granted === "False" &&
              <>
                <Label>Datum besluit</Label>
                <Value value={ formatDate(permit.details.DATE_DECISION) } />
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
        <TwoColumns>{ isBusy ? "Vergunningen ophalen…" : "Geen vergunningen of aanvragen gevonden." }</TwoColumns>
      }
      <HrWide />
    </CaseDetailSection>
  )
}

export default Permits
