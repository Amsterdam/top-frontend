import React, {useEffect} from "react"
import styled from "styled-components"
import {constants} from "@datapunt/asc-ui"
import { ascDefaultTheme } from "@datapunt/asc-core"
import IconButton from "../IconButton"

const FixedWrap = styled.div`  
  // @TODO refactor our use of z-index. This gets out of hand quickly.
  
  z-index: 99999; // HeaderWrap has z-index of 9999, we have top that. 
    
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
  display: flex;
  flex-direction: column;     
`

const TopBar = styled.div`
  box-sizing: border-box;

  background-color: white;
  position: relative;   // relative, because we want to  position the close icon absolutely within it.  
    
  height: ${constants.HEADER_HEIGHT_SMALL}px; 
  padding: 15px;
     
  border-bottom: 1px solid ${ascDefaultTheme.colors.tint.level5};
  
  h4 {
    margin:0;
  }
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  
  height: 24px;
  width: 24px;
`

const Body = styled.div`
  background-color: white;
  flex: 1;
    
  overflow-y: auto;
  
  padding: 15px;
           
  -webkit-overflow-scrolling: touch;  // iOS momentum scrolling. @see: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling
`

const Footer = styled.div`
  background-color: white;
  padding: 15px;
  
  >button:not(:last-of-type) {
    margin-right: 15px;
  }
`

type Props = {
  title?: string
  onClose?: () => void
  body?: JSX.Element
  footer?: JSX.Element
}

const ESCAPE_KEYS = ['Escape', '27']
export const defaultCloseHandler = () => window.history.back()

const DefaultModal:React.FC<Props> = ({title, onClose, body, footer}) => {
  const close = () => onClose ? onClose() : defaultCloseHandler()

  const onKeyDown = (event:KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  return (
  <FixedWrap>
    <TopBar>
      <h4>{ title }</h4>
      <StyledIconButton
        border={false}
        icon='Close'
        onClick={close}
      />
    </TopBar>
    <Body>
      { body }
    </Body>
    <Footer>
      { footer }
    </Footer>
  </FixedWrap>
  )
}

export default DefaultModal
