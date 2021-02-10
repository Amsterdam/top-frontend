import React, { FC } from "react"
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { permitType, useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import isBetweenDates from "app/features/shared/utils/isBetweenDates"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { Grid, HrWide } from "../CaseDetailSectionStyles"

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
  const rentedToday = notified ? notifiedRentals?.filter(r => isBetweenDates(new Date(r.check_in), new Date(r.check_out), new Date())).length : false

  const permitHasBeenGranted = (permit: permitType) => permit.permit_granted === "True"
  const permitIsForBAndB = (permit: permitType) => permit.permit_type.startsWith("B&B")

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
              { permitIsForBAndB(permit) &&
              <>
                <Label>Soort vergunning</Label>
                <Value value={ permit.details.PERMIT_TYPE } />
              </>
              }
              <Label>Aangevraagd door</Label>
              <Value value={ permit.details.APPLICANT } />
              { permitIsForBAndB(permit) &&
              <>
                <Label>Vergunninghouder</Label>
                <Value value={ permit.details.HOLDER } />
              </>
              }
              <Label>Locatie</Label>
              <Value value={ permit.details.ADDRESS } />
              { permitHasBeenGranted(permit) &&
              <>
                <Label>Verleend per</Label>
                <Value value={ formatDate(permit.details.DATE_VALID_FROM) } />
                { permitIsForBAndB(permit) ?
                  <>
                    <Label>Geldig tot en met</Label>
                    <Value value={ formatDate(permit.details.DATE_VALID_UNTIL ?? permit.details.DATE_VALID_TO) } />
                  </> :
                  <>
                    <Label>Geldig tot</Label>
                    <Value value={ formatDate(permit.details.DATE_VALID_TO ?? permit.details.DATE_VALID_UNTIL) } />
                  </>
                }
              </>
              }
              { permit.permit_type === "Vakantieverhuur" &&
              <>
                <Label>Vandaag verhuurd (bron: BWV)</Label>
                <Value value={ rentedToday } />
                <Label>Nachten verhuurd { new Date().getFullYear() } (bron: BWV)</Label>
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
