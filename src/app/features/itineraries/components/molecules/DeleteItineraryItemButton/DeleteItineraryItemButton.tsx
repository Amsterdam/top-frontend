import React, { useCallback } from "react"
import { TrashBin } from "@amsterdam/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useItineraryItem } from "app/state/rest"

type Props = {
  onDeleteButtonClicked: () => void
  id: number
}

const DeleteItineraryItemButton: React.FC<Props> = ({ id, onDeleteButtonClicked }) => {
  const { execDelete } = useItineraryItem(id, { lazy: true })
  const handleClick = useCallback(() => {
    if(window.confirm("Weet je zeker dat je dit adres uit je lijst wilt verwijderen?")) { onDeleteButtonClicked(); return execDelete() } } , [ execDelete, onDeleteButtonClicked ])
  return <StyledButton variant="blank" onClick={handleClick} icon={<TrashBin />} />
}

export default DeleteItineraryItemButton
