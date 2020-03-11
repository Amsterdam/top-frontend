import React, { FC, useRef } from "react"
import { Button } from "@datapunt/asc-ui"
import noop from "../../lib/utils/noop"

type Props = {
  onClick?: () => void
}

const OptionsButton: FC<Props> = ({ onClick = noop }) => <Button onClick={ onClick }>&hellip;</Button>
export default OptionsButton
