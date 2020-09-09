import React, { useContext } from "react"
import { themeColor, themeSpacing, Button } from "@datapunt/asc-ui"
import styled from "styled-components"

import { ErrorContext } from "app/state/error/ErrorProvider"
import { Close } from "@datapunt/asc-assets"

const Wrap = styled.div`
  position: fixed;
  top: 0;
  
  width: 100%;     
  padding: ${ themeSpacing(4) };
  background-color: ${ themeColor("support", "invalid") };
  display: flex;    
`

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom:0;
  left: 0;
  right: 0;  
  background-color: rgba(0,0,0,.7);
  
  z-index: 10;
`

const Stretch = styled.div`
  color: ${ themeColor("tint", "level1") };
  flex: 1;
`

const H3 = styled.h3`
  margin: 0;
`

const P = styled.p`
  margin-bottom: 0;
`

const ErrorDisplay: React.FC = () => {
  const { error, clearError } = useContext(ErrorContext)

  if (!error) {
    return null
  }

  return <BackDrop onClick={clearError}>
    <Wrap>
      <Stretch>
        <H3>Oeps, er ging iets mis!</H3>
        <P>{ error }</P>
      </Stretch>
      <Button
        variant="secondary"
        size={24}
        icon={ <Close /> }
        onClick={clearError}
      />
    </Wrap>
  </BackDrop>
}

export default ErrorDisplay
