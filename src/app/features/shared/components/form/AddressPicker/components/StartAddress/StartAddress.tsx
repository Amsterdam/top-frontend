import React from "react"
import styled from "styled-components"
import { Spinner, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"
import displayAddress from "app/features/shared/utils/displayAddress"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import { useCaseModal } from "../../hooks/useCaseModal"
import { Case } from "app/features/types"

type Props = {
  caseId: string
}

const Card = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(2) };
  background-color: ${ themeColor("tint", "level2") };
`

const normalize = (object: Case, href: string): React.ComponentProps<typeof ItineraryItemCard> => ({
  href,
  address: displayAddress(object?.address?.street_name, object?.address?.number, object?.address?.suffix_letter, object?.address?.suffix),
  postalCode: object?.address?.postal_code,
  fraudProbability: <FraudProbability fraudProbability={ object?.fraud_prediction?.fraud_probability } />,
  reason: object?.reason,
  badge: (object?.workflows && object?.workflows.length > 0
  ? <StadiumBadge stadium={ object?.workflows[0].state.name || "" } />
  : <StadiumBadge stadium={ "" } />)
})

const StartAddress: React.FC<Props> = ({ caseId }) => {
  const { data, isBusy } = useCase(caseId)
  const { getUrl } = useCaseModal()

  return (
    <Card>
      { isBusy
        ? <Spinner />
        : <ItineraryItemCard { ...normalize(data!, getUrl(String(caseId))) } />
      }
    </Card>
  )
}

export default StartAddress
