import React, { useCallback } from "react"
import { Button, themeColor, themeSpacing } from "@datapunt/asc-ui"

import { useToggle } from "app/features/shared/hooks/useToggle/useToggle"
import useNodeDimensions from "app/features/shared/hooks/useNodeDimensions/useNodeDimensions"
import useNodeByReference from "app/features/shared/hooks/useNodeByReference/useNodeByReference"
import styled from "styled-components"


const GUTTER = 8
const HELP_TEXT_WIDTH = 320

const DIM = 28
const Wrap = styled.div`
  position: relative;
  width: ${ DIM }px;
  height: ${ DIM }px;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0,0,0,.4);
`

const ButtonWrap = styled.div`
  position: absolute;
`

type HelpTextProps = {
  top?: number
  leftOffset?: number
}
const HelpText = styled.div<HelpTextProps>`
  padding: ${ themeSpacing(3) };
  position: absolute;
  border: 1px solid ${ themeColor("tint", "level2") };
  background-color: ${ themeColor("tint", "level1") };
  z-index: 500;

  width: ${ HELP_TEXT_WIDTH }px;
  left: ${ props => props?.leftOffset !== undefined ? -HELP_TEXT_WIDTH + props.leftOffset : -HELP_TEXT_WIDTH }px;
  ${ props => props.top !== undefined && `top: ${ props.top + GUTTER }px;` }
`

const StyledButton = styled(Button)`
  padding: 12px;
  border: 2px solid ${ themeColor("tint", "level7") };
  border-radius: 50%;
`

const HelpButton: React.FC = ({ children }) => {
  const [ isOpen, toggleOpen ] = useToggle(false)

  const { ref: buttonRef, node: buttonNode } = useNodeByReference<HTMLDivElement>()
  const buttonDimensions = useNodeDimensions(buttonNode)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    toggleOpen()
  }, [ toggleOpen ])

  return (
    <Wrap>
      <ButtonWrap ref={buttonRef}>
        <StyledButton size={18} variant="blank" onClick={handleClick}>?</StyledButton>
      </ButtonWrap>
      { isOpen && (
        <>
          <Overlay onClick={handleClick} />
          <HelpText onClick={handleClick} top={buttonDimensions?.bottom} leftOffset={ buttonDimensions?.right}>
            { children }
          </HelpText>
        </>
      ) }
    </Wrap>
  )
}

export default HelpButton
