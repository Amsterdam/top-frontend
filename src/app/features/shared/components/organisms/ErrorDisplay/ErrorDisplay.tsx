import React, { useContext } from "react"
import { Button, Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import { ErrorContext } from "app/state/error/ErrorProvider"
import { Close } from "@amsterdam/asc-assets"

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, .7);
`

const Wrap = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  padding: ${ themeSpacing(4) };
  background-color: ${ themeColor("support", "invalid") };
`

const Stretch = styled.div`
  color: ${ themeColor("tint", "level1") };
  flex: 1;
`

const InverseHeading = styled(Heading)`
  color: ${ themeColor("tint", "level1") };
`

const ErrorDisplay: React.FC = () => {
  const { message, severity, clearError } = useContext(ErrorContext)

  if (!message) {
    return null
  }

  return (
    <Backdrop onClick={ clearError }>
      <Wrap>
        <Stretch>
          <InverseHeading forwardedAs="h3">Oeps, er ging iets mis!</InverseHeading>
          { message && <Paragraph>{ message }</Paragraph> }
          <Paragraph>Ernst: { severity || "–" }</Paragraph>
        </Stretch>
        <Button
          variant="secondary"
          size={ 24 }
          icon={ <Close /> }
          onClick={ clearError }
        />
      </Wrap>
    </Backdrop>
  )
}

export default ErrorDisplay
