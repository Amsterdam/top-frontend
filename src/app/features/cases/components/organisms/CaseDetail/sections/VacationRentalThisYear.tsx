import React, { FC } from "react"
import styled from "styled-components"

import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatBoolean from "app/features/shared/utils/formatBoolean"
import formatDate from "app/features/shared/utils/formatDate"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { Grid, Hr, TwoColumns } from "../CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const Details = styled.details`
  grid-column: span 2;
  justify-self: stretch;
`

const Summary = styled.summary`
  color: ${ themeColor("primary") };
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  details[open] > & {
    margin-bottom: ${ themeSpacing(4) };
  }
`

const VacationRentalThisYear: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })
  const verhuur = decos?.vakantieverhuur_meldingen ?? []

  if (!caseData) {
    return null
  }

  return (
    <CaseDetailSection
      id="vakantieverhuur"
      title="Vakantieverhuur dit jaar"
      dataSource="Decos"
      isBusy={ isBusy }
    >
      <Grid>
        <Label>Nachten verhuurd</Label>
        <Value>
          <strong>{ verhuur.rented_days_count }</strong>
        </Value>
        <Label>Vandaag verhuurd</Label>
        <Value value={ formatBoolean(verhuur.is_rented_today) } />
        <Label>Nachten gepland</Label>
        <Value value={ verhuur.planned_days_count } />
        { verhuur.rented_days_count > 0 &&
        <>
          <TwoColumns>
            <Hr />
          </TwoColumns>
          <Details>
            <Summary>Alle meldingen</Summary>
            <Grid>
              {
                verhuur.meldingen.map((melding: Components.Schemas.VakantieverhuurMelding, index: number) => {
                  const checkIn = new Date(melding.check_in_date)
                  const checkOut = new Date(melding.check_out_date)
                  const nightsRented = (checkOut.getTime() - checkIn.getTime()) / 8.64e+7

                  return (
                    <React.Fragment key={ index }>
                      <TwoColumns>
                        <strong>
                          { melding.is_afmelding ? "Afmelding " : "Melding " }
                          { nightsRented } nachten
                        </strong>
                      </TwoColumns>
                      <Label>Check in</Label>
                      <Value value={ formatDate(melding.check_in_date) } />
                      <Label>Check out</Label>
                      <Value value={ formatDate(melding.check_out_date) } />
                    </React.Fragment>
                  )
                })
              }
            </Grid>
          </Details>
        </>
        }
      </Grid>
    </CaseDetailSection>
  )
}

export default VacationRentalThisYear
