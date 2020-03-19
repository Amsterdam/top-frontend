import React, { FC, ReactNode, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Enlarge, Minimise, TrashBin, DocumentText, Ellipsis } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"

type Props = {
  icon?: "Enlarge" | "Minimise" | "TrashBin" | "DocumentText" | "Ellipsis"
  iconNode?: ReactNode
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
  size?: number
  border?: boolean
  disabled?: boolean
}

const iconMap = {
  "Enlarge": <Enlarge />,
  "Minimise": <Minimise />,
  "TrashBin": <TrashBin />,
  "DocumentText": <DocumentText />,
  "Ellipsis": <Ellipsis />
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const IconButton: FC<Props> = ({ icon, iconNode, onClick = noop, size = 60, border = true, disabled = false }) => {
  const Component = border ? StyledButton : Button
  const iconElement = icon !== undefined ? iconMap[icon] : iconNode
  return <Component onClick={ onClick } size={ size } variant="blank" icon={ iconElement } disabled={ disabled } />
}

export default IconButton
