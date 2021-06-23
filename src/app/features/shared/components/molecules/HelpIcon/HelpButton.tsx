import React, { useCallback } from "react"
import { Button, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import InfoIcon from "app/features/shared/components/atoms/InfoIcon/InfoIcon"

import { useToggle } from "app/features/shared/hooks/useToggle/useToggle"
import styled from "styled-components"

const GUTTER = 8
const HELP_TEXT_WIDTH = 320

const DIM = 20
const Wrap = styled.div`
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

const HelpText = styled.div`
  padding: ${ themeSpacing(3) };
  position: absolute;
  border: 1px solid ${ themeColor("tint", "level2") };
  background-color: ${ themeColor("tint", "level1") };
  z-index: 500;

  width: ${ HELP_TEXT_WIDTH }px;
  left: 0;
  margin-top: ${ GUTTER }px;

  p {
    white-space: normal;
  }
`

const StyledButton = styled(Button)`
  padding: 10px;
  border-radius: 50%;
`

const HelpButton: React.FC = ({ children }) => {
  const [ isOpen, toggleOpen ] = useToggle(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    toggleOpen()
  }, [ toggleOpen ])

  return (
    <Wrap>
      <div>
        <StyledButton size={ 18 } variant="blank" onClick={ handleClick }><InfoIcon /></StyledButton>
      </div>
      { isOpen && (
        <>
          <Overlay onClick={ handleClick } />
          <HelpText onClick={ handleClick }>
            { children }
          </HelpText>
        </>
      ) }
    </Wrap>
  )
}

export default HelpButton
