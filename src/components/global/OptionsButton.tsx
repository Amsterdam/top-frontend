import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import noop from "../../lib/utils/noop"
import { Ellipsis } from "@datapunt/asc-assets"

type Props = {
  onClick?: () => void
}

const OptionsButton: FC<Props> = ({ onClick = noop }) => <Button icon={ <Ellipsis /> } onClick={ onClick }>&hellip;</Button>
export default OptionsButton
