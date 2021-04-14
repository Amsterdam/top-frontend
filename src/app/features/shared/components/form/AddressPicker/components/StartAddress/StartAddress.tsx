import React from "react"
import styled from "styled-components"
import { Spinner, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"
import displayAddress from "app/features/shared/utils/displayAddress"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import { useCaseModal } from "../../hooks/useCaseModal"

type Props = {
  caseId: string
}

const Card = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(2) };
  background-color: ${ themeColor("tint", "level2") };
`

const normalize = (object: any, href: string): React.ComponentProps<typeof ItineraryItemCard> => ({
  href,
  address: displayAddress(object?.address?.street_name, object?.address?.number, object?.address?.suffix_letter, object?.address?.suffix),
  postalCode: object?.address?.postal_code,
  reason: object?.related_cases?.[0]?.case_reason,
  fraudProbability: <FraudProbability fraudProbability={ object?.fraud_prediction?.fraud_probability } />,
  badge: <StadiumBadge stadium={ object?.import_stadia?.[0]?.sta_oms } />
})

const StartAddress: React.FC<Props> = ({ caseId }) => {
  const { data, isBusy } = useCase(caseId)
  const { getUrl } = useCaseModal()

  return (
    <Card>
      { isBusy
        ? <Spinner />
        : <ItineraryItemCard { ...normalize(data, getUrl(caseId)) } />
      }
    </Card>
  )
}

export default StartAddress
