import React, { useContext } from "react"
import styled from "styled-components"
import { Close } from "@amsterdam/asc-assets"
import { Button, Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import { Severity } from "app/features/types"
import { ErrorContext } from "app/state/error/ErrorProvider"

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, .7);
`

const Wrap = styled.div<{severity: Severity}>`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  padding: ${ themeSpacing(4) };
  background-color: ${ props => props.severity === "INFO" ? themeColor("primary") : themeColor("support", "invalid") };
`

const Stretch = styled.div`
  flex: 1;
`

const InverseHeading = styled(Heading)`
  color: ${ themeColor("tint", "level1") };
`

const InverseParagraph = styled(Paragraph)`
  color: ${ themeColor("tint", "level1") };
`

const ErrorDisplay: React.FC = () => {
  const { message, severity, clearError } = useContext(ErrorContext)

  if (!message) {
    return null
  }

  return (
    <Backdrop onClick={ clearError }>
      <Wrap severity={ severity }>
        <Stretch>
          <InverseHeading forwardedAs="h3">Oeps, er ging iets mis!</InverseHeading>
          { message && <InverseParagraph>{ message }</InverseParagraph> }
        </Stretch>
        <Button
          variant="blank"
          size={ 24 }
          icon={ <Close /> }
          onClick={ clearError }
        />
      </Wrap>
    </Backdrop>
  )
}

export default ErrorDisplay
