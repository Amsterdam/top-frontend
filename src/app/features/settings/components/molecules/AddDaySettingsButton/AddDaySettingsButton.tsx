import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import { Button } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"

type Props = {
  teamSettingsId: number
  dayOfTheWeekId: number
}

const AddDaySettingsButton: React.FC<Props> = ({ teamSettingsId, dayOfTheWeekId }) => {
  const handleClick = useCallback(
    () => navigate(to("/team-settings/:teamSettingsId/nieuw",
      { teamSettingsId }) + "?d=" + dayOfTheWeekId),
    [ teamSettingsId, dayOfTheWeekId ]
  )

  return <Button variant="primaryInverted" onClick={ handleClick }>Voeg toe</Button>
}

export default AddDaySettingsButton
