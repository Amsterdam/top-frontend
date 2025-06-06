import React from "react"
import { Button } from "@amsterdam/asc-ui"
import { ButtonVariant } from "@amsterdam/asc-ui/lib/components/Button/Button"
import styled from "styled-components"

export type Props = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  onClick: () => void
  isCollapsed: boolean
  variant?: ButtonVariant
  textToOpen?: string
  textToClose?: string
}

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`

const ToggleCollapse: React.FC<Props> = (
  {
    onClick,
    isCollapsed,
    variant = "textButton",
    textToOpen = "+ Toon alle",
    textToClose = "- Toon minder"
  }) => (
  <StyledButton onClick={ onClick } variant={ variant }>{ isCollapsed ? textToOpen : textToClose }</StyledButton>
)

export default ToggleCollapse
