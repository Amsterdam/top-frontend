import React, {useEffect} from "react";
import styled from "styled-components";
import { constants } from "@datapunt/asc-ui"

import Portal from "./Portal";
import IconButton from "../IconButton";

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
  background-color: white;
  position: relative;   // relative, because we want to  position the close icon absolutely within it.  
    
  height: ${constants.HEADER_HEIGHT_SMALL}px; 
  text-align:center; 
  border-bottom: 1px solid #DFDFDF;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

const ScrollContainer = styled.div`
  background-color: white;
  flex: 1;
    
  overflow-y: auto;
           
  -webkit-overflow-scrolling: touch;  // iOS momentum scrolling. @see: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling
`
const Spacing = styled.div`
  margin: 15px;
`

type Props = {
  onClose?: () => void
}

const ESCAPE_KEYS = ['Escape', '27']
const defaultCloseHandler = () => window.history.back()

const DefaultModal:React.FC<Props> = ({onClose, children}) => {
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
    <Portal>
      <FixedWrap>
        <TopBar>
          <StyledIconButton
            border={false}
            icon='Close'
            onClick={close}
          />
        </TopBar>
        <ScrollContainer>
          <Spacing>
            { children }
          </Spacing>
        </ScrollContainer>
      </FixedWrap>
    </Portal>)
}

export default DefaultModal
