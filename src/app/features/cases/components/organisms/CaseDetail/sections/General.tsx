import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { CaseIdDisplay } from "@amsterdam/wonen-ui"

import { useCase, useDaySettings } from "app/state/rest"

import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import FraudPredictionDetailsModal from "app/features/cases/components/organisms/FraudPrediction/FraudPredictionDetailsModal"
import { useFraudPredictionModal } from "app/features/cases/components/organisms/FraudPrediction/hooks/useFraudPredictionModal"
import { hideFraudProbability } from "app/features/shared/utils/fraudPredictionPilot"

import { getAddress, getEigenaar } from "../utils"
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

  const address = getAddress(caseData.address)
  const postalCode = caseData.address.postal_code
  const eigenaar = getEigenaar(caseData)

  const hasPriority = (caseData.schedules && caseData.schedules[0]?.priority?.weight >= 0.5) ?? false
  const hasWarrant = (caseData.schedules && caseData.schedules[0]?.priority?.weight >= 1.0) ?? false
  const lastStadiumLabel = caseData.workflows?.length > 0 ? caseData.workflows[0].state.name : undefined

  const fraudPrediction = !caseData.day_settings_id || (daySettings && daySettings.team_settings.fraud_prediction_model) ? caseData.fraud_prediction : undefined
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
          <Label>Eigenaar</Label>
          <Value sensitive value={ eigenaar } />
          { fraudPrediction && !hideFraudProbability(caseId, daySettings?.team_settings?.fraudprediction_pilot_enabled) && (
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
          )}
        </Grid>
      </SectionRow>
      <SectionRow>
        <CenteredAnchor
          href={ `https://www.google.com/maps/place/${ address }, Amsterdam` }
          target="_blank"
          rel="noopener noreferrer"
        >
          Bekijk op Google Maps
        </CenteredAnchor>
      </SectionRow>
    </Section>
  )
}

export default General
