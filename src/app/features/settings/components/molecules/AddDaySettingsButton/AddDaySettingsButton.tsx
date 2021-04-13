import React, { useCallback } from "react"
import { Enlarge } from "@amsterdam/asc-assets"
import { navigate } from "@reach/router"
import to from "app/features/shared/routing/to"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"

type Props = {
  teamSettingsId: number
  dayOfTheWeekId: number
}

const AddDaySettingsButton: React.FC<Props> = ({ teamSettingsId, dayOfTheWeekId }) => {
  const handleClick = useCallback(() => navigate(to("/team-settings/:teamSettingsId/nieuw", { teamSettingsId }) + "?d=" + dayOfTheWeekId), [ teamSettingsId, dayOfTheWeekId ])
  return <StyledButton variant="blank" onClick={ handleClick } icon={ <Enlarge /> } />
}

export default AddDaySettingsButton
