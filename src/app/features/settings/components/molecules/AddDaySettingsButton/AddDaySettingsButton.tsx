import React, { useCallback } from "react"
import { Button } from "@amsterdam/asc-ui"
import { useNavigate } from "react-router-dom"

type Props = {
  teamSettingsId: string
  dayOfTheWeekId: number
}

const AddDaySettingsButton: React.FC<Props> = ({ teamSettingsId, dayOfTheWeekId }) => {
  const navigate = useNavigate()

  const handleClick = useCallback(
    () => navigate(`/team-settings/${ teamSettingsId }/nieuw?d=${ dayOfTheWeekId }`),
    [ teamSettingsId, dayOfTheWeekId ]
  )

  return <Button variant="primaryInverted" onClick={ handleClick }>Toevoegen</Button>
}

export default AddDaySettingsButton
