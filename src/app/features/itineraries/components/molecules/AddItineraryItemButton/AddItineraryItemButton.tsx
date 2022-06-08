import React, { useCallback } from "react"
import { Enlarge } from "@amsterdam/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useItineraryItems } from "app/state/rest"

type Props = {
  caseId: number | string
  itinerary: number
}

const AddItineraryItemButton: React.FC<Props> = ({ itinerary, caseId }) => {
  const { execPost } = useItineraryItems({ lazy: true })
  const handleClick = useCallback(() => execPost({ itinerary, id: caseId }), [ execPost, itinerary, caseId ])
  return <StyledButton variant="blank" onClick={ handleClick } icon={ <Enlarge /> } />
}

export default AddItineraryItemButton
