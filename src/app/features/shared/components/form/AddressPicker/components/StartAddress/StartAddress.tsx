import React from "react"
import styled from "styled-components"
import { Spinner } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"
import displayAddress from "app/features/shared/utils/displayAddress"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import { useCaseModal } from "../../hooks/useCaseModal"
import { Case } from "app/features/types"

type Props = {
  caseId: string
}

const Card = styled.div`
  padding: 12px 8px;
  background-color: #F5F5F5;
`

const normalize = (object: Case, href: string): React.ComponentProps<typeof ItineraryItemCard> => ({
  href,
  address: displayAddress(object?.address?.street_name, object?.address?.number, object?.address?.suffix_letter, object?.address?.suffix),
  postalCode: object?.address?.postal_code,
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
