import React, { useCallback } from "react"
import { TrashBin } from "@datapunt/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useItineraryItem } from "app/state/rest"

type Props = {
  id: number
}

const DeleteItineraryItemButton: React.FC<Props> = ({ id }) => {
  const { execDelete } = useItineraryItem(id, { lazy: true })
  const handleClick = useCallback(() => { if(window.confirm("Weet je zeker dat je dit adres (en eventuele notities) uit je lijst wilt verwijderen?")) { return execDelete() } } , [ execDelete ])
  return <StyledButton variant="blank" onClick={handleClick} icon={<TrashBin />} />
}

export default DeleteItineraryItemButton
