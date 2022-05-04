import React from "react"
import { Button, themeSpacing } from "@amsterdam/asc-ui"
import { useVisit } from "app/state/rest"
import CheckmarkIcon from "app/features/itineraries/components/atoms/CheckmarkIcon/CheckmarkIcon"
import styled from "styled-components"

type Props = {
  visit: Components.Schemas.Visit
}

const StyledSpan = styled.span`
  margin-left: ${ themeSpacing(2) };
`

const CompleteVisitButton: React.FC<Props> = ({ visit }) => {
  const { execPatch, isBusy } = useVisit(visit.id)

  return (
    <Button
      variant="secondary"
      onClick={ () => execPatch({ completed: true }) }
      disabled={ isBusy }
    >
      <CheckmarkIcon />
      <StyledSpan>Afronden</StyledSpan>
    </Button>
  )
}

export default CompleteVisitButton
