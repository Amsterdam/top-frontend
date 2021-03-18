import React, { FC } from "react"
import { Heading } from "@amsterdam/asc-ui"

import { permitType, useAllPermitCheckmarks, useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

import { getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import { Grid, HrWide, TwoColumns } from "../CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const Permits: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const bagId = getBagId(caseData!)
  const { data: decos, isBusy } = useAllPermitCheckmarks(bagId!, { lazy: !bagId })

  const foundPermits = decos?.permits?.filter(permit => [ "True", "False" ].includes(permit.permit_granted)) || []

  const permitHasBeenGranted = (permit: permitType) => permit.permit_granted === "True"
  const permitIsForBAndB = (permit: permitType) => permit.permit_type.startsWith("B&B")
  const permitHasEndDate = (permit: permitType) => permit.details.DATE_VALID_TO || permit.details.DATE_VALID_UNTIL

  return (
    <CaseDetailSection
      title="Vergunningen"
      data={ [
        [ "Databron", "BWV" ],
        [ "Shortstay", caseData?.vakantie_verhuur?.shortstay === "J" ]
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
              <Value sensitive value={ permit.details.APPLICANT } />
              { permitIsForBAndB(permit) &&
              <>
                <Label>Vergunninghouder</Label>
                <Value sensitive value={ permit.details.HOLDER } />
              </>
              }
              <Label>Locatie</Label>
              <Value sensitive value={ permit.details.ADDRESS } />
              { permitHasBeenGranted(permit) &&
              <>
                <Label>Verleend per</Label>
                <Value sensitive value={ formatDate(permit.details.DATE_VALID_FROM) } />
                { permitHasEndDate(permit) &&
                permitIsForBAndB(permit) ?
                  <>
                    <Label>Geldig tot en met</Label>
                    <Value sensitive
                           value={ formatDate(permit.details.DATE_VALID_UNTIL ?? permit.details.DATE_VALID_TO) } />
                  </> :
                  <>
                    <Label>Geldig tot</Label>
                    <Value sensitive
                           value={ formatDate(permit.details.DATE_VALID_TO ?? permit.details.DATE_VALID_UNTIL) } />
                  </>
                }
              </>
              }
              { permit.permit_granted === "False" &&
              <>
                <Label>Datum besluit</Label>
                <Value value={ formatDate(permit.details.DATE_DECISION) } />
              </>
              }
            </Grid>
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
