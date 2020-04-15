import React, { FC, ReactNode, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import StyledButton from "../styled/Button"
import { Enlarge, Minimise, TrashBin, DocumentText, Ellipsis, Close } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"

type Props = {
  className?: ClassName
  type?: "submit" | "reset" | "button"
  icon?: keyof typeof iconMap
  iconNode?: ReactNode
  onClick?: (a: MouseEvent) => void
  size?: number
  border?: boolean
  disabled?: boolean
}

const iconMap = {
  "Enlarge": <Enlarge />,
  "Minimise": <Minimise />,
  "TrashBin": <TrashBin />,
  "DocumentText": <DocumentText />,
  "Ellipsis": <Ellipsis />,
  "Close": <Close />
}

const IconButton: FC<Props> = ({ className, icon, iconNode, type = "button", onClick = noop, size = 44, border = true, disabled = false }) => {
  const Component = border ? StyledButton : Button
  const iconElement = icon !== undefined ? iconMap[icon] : iconNode
  return (
    <Component
      className={ className }
      type={ type }
      onClick={ onClick }
      size={ size }
      variant="blank"
      icon={ iconElement }
      disabled={ disabled }
      />
  )
}

export default IconButton
