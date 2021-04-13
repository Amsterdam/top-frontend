import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import { TrashBin } from "@amsterdam/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useDaySettings } from "app/state/rest"

import to from "app/features/shared/routing/to"

type Props = {
    teamSettingsId: number
    daySettingsId: number
}

const DeleteDaySettingsButton: React.FC<Props> = ({ teamSettingsId, daySettingsId }) => {
  const { execDelete } = useDaySettings(daySettingsId, { lazy: true })

  const handleClick = useCallback(async () => {
    if (window.confirm("Weet je zeker dat je deze daginstelling wilt verwijderen?")) {
      await navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
      return execDelete()
    }
  }, [ execDelete, teamSettingsId ])

  return <StyledButton variant="blank" onClick={ handleClick } icon={ <TrashBin /> } />
}

export default DeleteDaySettingsButton
