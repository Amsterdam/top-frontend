import React, { useCallback } from "react"
import { useDaySettings } from "app/state/rest"
import useNavigation from "app/features/shared/routing/useNavigation"
import { Button } from "@amsterdam/asc-ui"

type Props = {
  teamSettingsId: string
  daySettingsId: string
}

const DeleteDaySettingsButton: React.FC<Props> = ({ teamSettingsId, daySettingsId }) => {
  const { execDelete } = useDaySettings(daySettingsId, { lazy: true })
  const { navigateTo } = useNavigation()

  const handleClick = useCallback(async () => {
    if (window.confirm("Weet je zeker dat je deze daginstelling wilt verwijderen?")) {
      await navigateTo("/team-settings/:teamSettingsId", { teamSettingsId })
      return execDelete()
    }
  }, [ execDelete, teamSettingsId ])

  return <Button variant="primaryInverted" onClick={ handleClick }>Verwijderen</Button>
}

export default DeleteDaySettingsButton
