import React, { useCallback } from "react"
import { Button } from "@amsterdam/asc-ui"
import useNavigation from "app/features/shared/routing/useNavigation"

type Props = {
  teamSettingsId: string
  dayOfTheWeekId: number
}

const AddDaySettingsButton: React.FC<Props> = ({ teamSettingsId, dayOfTheWeekId }) => {
  const { navigateTo } = useNavigation()

  const handleClick = useCallback(
    () => navigateTo("/team-settings/:teamSettingsId/nieuw", { teamSettingsId }) + "?d=" + dayOfTheWeekId,
    [ teamSettingsId, dayOfTheWeekId ]
  )

  return <Button variant="primaryInverted" onClick={ handleClick }>Toevoegen</Button>
}

export default AddDaySettingsButton
