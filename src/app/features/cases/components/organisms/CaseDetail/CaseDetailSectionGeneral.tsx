import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import Label from "app/features/cases/components/atoms/Label/Label"
import { Case, FraudPrediction } from "app/features/types"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"

import FraudPredictionDetailsModal from "../FraudPrediction/FraudPredictionDetailsModal"
import { useFraudPredictionModal } from "../FraudPrediction/hooks/useFraudPredictionModal"

import { CenteredAnchor, Section, SectionRow } from "./CaseDetailStyles"

type Props = {
  address: string
  caseCount?: number
  caseItem: Case
  eigenaar?: string
  footer?: {
    link: string
    title: string
  }
  fraudPrediction?: FraudPrediction
  isSia: boolean
  personCount: number
  postalCode: string
  signal?: string
}

const PostalCode = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`

const BadgeRow = styled.div`
  display: flex;
  margin-bottom: ${ themeSpacing(2) };
  
  > :not(:last-child) {
    margin-right: ${ themeSpacing(2) };
  }
`

const Span = styled.span`
  vertical-align: top;
`

const CaseDetailSectionGeneral: FC<Props> = (
  {
    address,
    caseCount,
    caseItem,
    eigenaar,
    footer,
    fraudPrediction,
    isSia,
    personCount,
    postalCode,
    signal
  }
) => {
  const caseNumber = caseItem.bwv_tmp.case_number !== null ? parseInt(caseItem.bwv_tmp.case_number, 10) : undefined
  const caseOpening = caseItem.bwv_tmp.openings_reden !== null ? caseItem.bwv_tmp.openings_reden : undefined
  const openCaseCount = caseItem.bwv_tmp.num_open_cases !== null ? caseItem.bwv_tmp.num_open_cases : undefined

  const showFooter = footer !== undefined

  const { getUrl: getToFraudPredictionModalUrl } = useFraudPredictionModal()

  const personText =
    personCount === 0 ? "Geen inschrijvingen" :
      personCount === 1 ? "1 persoon" :
        `${ personCount } personen`

  return (
    <Section>
      <SectionRow>
        <Heading>{ address }</Heading>
        <PostalCode>{ postalCode }</PostalCode>
        <BadgeRow>
          { signal && <StadiumBadge stadium={ signal! } /> }
          { isSia && <StadiumBadge stadium="SIA" /> }
        </BadgeRow>
        <div>
          <Label>Ingeschreven</Label><Span>{ personCount > 0 ?
          <ScrollToAnchor anchor="personen" text={ personText } /> : personText }</Span>
        </div>
        <div>
          <Label>Zaaknummer</Label>
          { caseNumber !== undefined && caseCount !== undefined ?
            <Span><strong>{ caseNumber }</strong> van { caseCount }</Span> :
            <InvalidDataSpan />
          }
        </div>
        <div>
          <Label>Open zaken</Label>
          { openCaseCount !== undefined ?
            <Span>{ openCaseCount }</Span> :
            <InvalidDataSpan />
          }
        </div>
        <div>
          <Label>Openingsreden</Label>
          { caseOpening !== undefined ?
            <Span>{ caseOpening }</Span> :
            <InvalidDataSpan />
          }
        </div>
        <div>
          <Label>Eigenaar</Label>
          { eigenaar !== undefined ?
            <Span>{ eigenaar }</Span> :
            <InvalidDataSpan />
          }
        </div>
        { fraudPrediction &&
        <div>
          <Link to={ getToFraudPredictionModalUrl() }>
            <Label>Voorspelling (bèta)</Label>
            <FraudProbability fraudProbability={ fraudPrediction?.fraud_probability } />
          </Link>
          <FraudPredictionDetailsModal
            title={ address }
            fraudPrediction={ fraudPrediction! }
          />
        </div>
        }
      </SectionRow>
      { showFooter &&
      <SectionRow>
        <CenteredAnchor href={ footer!.link }>{ footer!.title }</CenteredAnchor>
      </SectionRow>
      }
    </Section>
  )
}

export default CaseDetailSectionGeneral
