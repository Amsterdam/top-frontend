import React, { FC, ReactNode, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import StyledButton from "../styled/Button"
import { Enlarge, Minimise, TrashBin, DocumentText, Ellipsis, Close } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"

type Props = {
  icon?: "Enlarge" | "Minimise" | "TrashBin" | "DocumentText" | "Ellipsis" | "Close"
  iconNode?: ReactNode
  onClick?: (a: MouseEvent) => void
  size?: number
  border?: boolean
  disabled?: boolean

  // By adding this property we make IconButton stylable through styled-components.
  // https://styled-components.com/docs/advanced#styling-normal-react-components
  className?: string
}

const iconMap = {
  "Enlarge": <Enlarge />,
  "Minimise": <Minimise />,
  "TrashBin": <TrashBin />,
  "DocumentText": <DocumentText />,
  "Ellipsis": <Ellipsis />,
  "Close": <Close />
}

const IconButton: FC<Props> = ({ className, icon, iconNode, onClick = noop, size = 44, border = true, disabled = false }) => {
  const Component = border ? StyledButton : Button
  const iconElement = icon !== undefined ? iconMap[icon] : iconNode
  return <Component onClick={ onClick } size={ size } variant="blank" icon={ iconElement } disabled={ disabled } className={className} />
}

export default IconButton
