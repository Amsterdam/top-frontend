import React, { MouseEvent, FC } from "react"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import noop from "../../lib/utils/noop"
import ResponsiveText from "../global/ResponsiveText"

type Props = {
  onClick?: (event: MouseEvent) => void
}

const StyledButton = styled(Button)`
  font-weight: bold;
  height: auto;
  padding: 12px 15px;
`

const ClearButton: FC<Props> = ({ onClick = noop }) =>
  <StyledButton type='reset' variant="textButton" onClick={ onClick }>
    <ResponsiveText text={ ["Wis", "Wis velden"] } />
  </StyledButton>

export default ClearButton
