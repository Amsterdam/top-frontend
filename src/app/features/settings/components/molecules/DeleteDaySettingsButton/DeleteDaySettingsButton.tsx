import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import { useDaySettings } from "app/state/rest"

import to from "app/features/shared/routing/to"
import { Button } from "@amsterdam/asc-ui"

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

  return <Button variant="primaryInverted" onClick={ handleClick }>Verwijderen</Button>
}

export default DeleteDaySettingsButton
