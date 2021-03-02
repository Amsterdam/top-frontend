import React, { FC } from "react"

import { useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatBoolean from "app/features/shared/utils/formatBoolean"
import formatDate from "app/features/shared/utils/formatDate"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

import { getBagId } from "app/features/cases/components/organisms/CaseDetail/utils"
import CaseDetailSection from "../CaseDetailSection"
import { Grid, Hr, TwoColumns } from "../CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const VacationRentalThisYear: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

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
        <Value value={ decos?.vakantieverhuur_meldingen.rented_days_count } />
        <Label>Vandaag verhuurd</Label>
        <Value value={ formatBoolean(decos?.vakantieverhuur_meldingen.is_rented_today) } />
        <Label>Nachten gepland</Label>
        <Value value={ decos?.vakantieverhuur_meldingen.planned_days_count } />
        <TwoColumns>
          <Hr />
        </TwoColumns>
        {
          decos?.vakantieverhuur_meldingen.meldingen.map((melding: Components.Schemas.VakantieverhuurMelding) => {
            const firstDay = new Date(melding.check_in_date)
            const lastDay = new Date(melding.check_out_date)
            const nightsRented = (lastDay.getTime() - firstDay.getTime()) / 8.64e+7

            return (
              <>
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
              </>
            )
          })
        }
      </Grid>
    </CaseDetailSection>
  )
}

export default VacationRentalThisYear
