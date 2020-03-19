import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"
import confirm from "../../lib/utils/confirm"
import ResponsiveText from "../global/ResponsiveText"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const RemoveAllButton: FC<Props> = ({ onClick = noop }) => {
  const message = "Weet je zeker dat je je hele looplijst wilt wissen?"
  const onClickConfirm = (event: MouseEvent<HTMLButtonElement>) => confirm(message, () => onClick(event))
  return (
    <StyledButton onClick={ onClickConfirm } variant="blank" iconLeft={ <TrashBin /> }>
      <ResponsiveText text={ ["Wis lijst", "Wis gehele looplijst"] } />
    </StyledButton>
  )
}
export default RemoveAllButton
