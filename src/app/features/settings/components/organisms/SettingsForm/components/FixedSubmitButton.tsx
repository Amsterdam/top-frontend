import React from "react"
import styled from "styled-components"
import { Button, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Checkmark, ChevronLeft } from "@amsterdam/asc-assets"
import { useFormState } from "react-final-form"
import Box from "app/features/shared/components/atoms/Box/Box"
import ErrorMessage from "app/features/shared/components/atoms/ErrorMessage/ErrorMessage"
import SuccessMessage from "app/features/shared/components/atoms/SuccessMessage/SuccessMessage"
import SmallSpinner from "app/features/shared/components/atoms/SmallSpinner/SmallSpinner"

type Props = {
  errorMessage?: string
  caseCount?: string
  onClose?: () => void
}

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  min-height: 85px;
  border-top: 1px solid ${ themeColor("tint", "level5") };
`

const StyledDiv = styled.div`
  margin-left: ${ themeSpacing(2) };
`

const StyledButton = styled(Button)`
  margin-right: ${ themeSpacing(3) }
`

/**
 * Renders a submit button in a fixed-positioned container
 */
const FixedSubmitButton: React.FC<Props> = ({ errorMessage, caseCount, onClose }) => {
  const { submitSucceeded, submitting, hasValidationErrors, dirty, dirtySinceLastSubmit } = useFormState()

  return (
    <div>
      <FixedBox hAlign="flex-end" vAlign="center" p={ 4 } bgColor="level1">
        { errorMessage && !dirtySinceLastSubmit && <ErrorMessage text={ errorMessage! } /> }
        { submitSucceeded && !submitting && !dirty && !errorMessage && <SuccessMessage text="Succesvol bewaard" /> }
        { submitting && <SmallSpinner /> }
        { caseCount !== undefined && !submitting && !dirty && !errorMessage && (
          <StyledDiv>{`Met deze instellingen zijn er ${ caseCount } beschikbare bezoeken mogelijk!`}</StyledDiv>
        )}
        <Box pl={ 3 } width="auto">
          {onClose && (
            <StyledButton type="button" onClick={onClose} variant="tertiary" iconSize={14} iconLeft={<ChevronLeft />}>
              Terug
            </StyledButton>
          )}
          <Button
            variant="secondary"
            disabled={ submitting || hasValidationErrors || !dirty }
            iconLeft={<Checkmark />}
          >
            Bereken en bewaar
          </Button>
        </Box>
      </FixedBox>
    </div>
  )
}

export default FixedSubmitButton
