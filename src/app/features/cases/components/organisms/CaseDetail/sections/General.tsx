import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCase, useDaySettings } from "app/state/rest"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import FraudPredictionDetailsModal
  from "app/features/cases/components/organisms/FraudPrediction/FraudPredictionDetailsModal"
import { useFraudPredictionModal } from "app/features/cases/components/organisms/FraudPrediction/hooks/useFraudPredictionModal"

import { getAddress, getCaseCount, getEigenaar } from "../utils"
import {
  CenteredAnchor,
  Grid,
  Section,
  SectionRow
} from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const PostalCode = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`

const BadgesRow = styled.div`
  display: flex;
  margin-bottom: ${ themeSpacing(2) };

  > :not(:last-child) {
    margin-right: ${ themeSpacing(2) };
  }
`

const General: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)
  const { getUrl: getToFraudPredictionModalUrl } = useFraudPredictionModal()

  if (!caseData) {
    return null
  }

  const caseCount = getCaseCount(caseData)
  const caseNumber = caseData.bwv_tmp.case_number !== null ? parseInt(caseData.bwv_tmp.case_number || "", 10) : undefined
  const caseOpening = caseData.bwv_tmp.openings_reden !== null ? caseData.bwv_tmp.openings_reden : undefined
  const openCaseCount = caseData.bwv_tmp.num_open_cases !== null ? caseData.bwv_tmp.num_open_cases : undefined

  const address = getAddress(caseData.import_adres)
  const eigenaar = getEigenaar(caseData)
  const fraudPrediction = !caseData.day_settings_id || (daySettings && daySettings.team_settings.fraud_prediction_model) ? caseData.fraud_prediction : undefined
  const isSia = (caseData.is_sia === "J")
  const postalCode = caseData.import_adres.postcode
  const residentCount = caseData.bwv_personen.filter(person => person.overlijdensdatum === null).length || 0

  const stadiaLabels = caseData.import_stadia.map(stadium => ({ description: stadium.sta_oms }))
  const lastStadiumLabel = stadiaLabels?.length ? stadiaLabels[0].description : undefined

  const residentsText =
    residentCount === 0 ? "Geen inschrijvingen" :
      residentCount === 1 ? "1 persoon" :
        `${ residentCount } personen`

  return (
    <Section>
      <SectionRow>
        <Heading>{ address }</Heading>
        <PostalCode>{ postalCode }</PostalCode>
        <BadgesRow>
          { lastStadiumLabel && <StadiumBadge stadium={ lastStadiumLabel! } /> }
          { isSia && <StadiumBadge stadium="SIA" /> }
        </BadgesRow>
        <Grid>
          <Label>Ingeschreven</Label>
          <span>{ residentCount > 0
            ? <ScrollToAnchor anchor="inschrijvingen" text={ residentsText } />
            : residentsText
          }</span>
          <Label>Zaaknummer</Label>
          <Value valid={ caseNumber !== undefined && caseCount !== undefined }>
            <span><strong>{ caseNumber }</strong> van { caseCount }</span>
          </Value>
          <Label>Open zaken</Label>
          <Value value={ openCaseCount } />
          <Label>Openingsreden</Label>
          <Value value={ caseOpening } />
          <Label>Eigenaar</Label>
          <Value sensitive value={ eigenaar } />
          { fraudPrediction &&
          <>
            <Label>Voorspelling (bèta)</Label>
            <Link to={ getToFraudPredictionModalUrl() }>
              <FraudProbability fraudProbability={ fraudPrediction?.fraud_probability } />
            </Link>
            <FraudPredictionDetailsModal
              title={ address }
              fraudPrediction={ fraudPrediction! }
            />
          </>
          }
        </Grid>
      </SectionRow>
      <SectionRow>
        <CenteredAnchor href={ `https://www.google.com/maps/place/${ address }, Amsterdam` }>
          Bekijk op Google Maps
        </CenteredAnchor>
      </SectionRow>
    </Section>
  )
}

export default General
