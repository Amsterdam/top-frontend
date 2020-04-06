import React, { FC, MouseEvent } from "react"
import Button from "../styled/Button"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"
import confirm from "../../lib/utils/confirm"
import ResponsiveText from "../global/ResponsiveText"

type Props = {
  onClick?: (a: MouseEvent) => void
}

const RemoveAllButton: FC<Props> = ({ onClick = noop }) => {
  const message = "Weet je zeker dat je je hele looplijst wilt wissen?"
  const onClickConfirm = (event: MouseEvent) => confirm(message, () => onClick(event))
  return (
    <Button onClick={ onClickConfirm } variant="blank" iconLeft={ <TrashBin /> }>
      <ResponsiveText text={ ["Wis lijst", "Wis gehele looplijst"] } />
    </Button>
  )
}
export default RemoveAllButton
