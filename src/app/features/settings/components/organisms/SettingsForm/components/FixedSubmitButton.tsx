import React from "react"
import styled from "styled-components"
import { Button, themeColor } from "@amsterdam/asc-ui"
import { useFormState } from "react-final-form"

import Box from "app/features/shared/components/atoms/Box/Box"
import ErrorMessage from "app/features/shared/components/atoms/ErrorMessage/ErrorMessage"
import SuccessMessage from "app/features/shared/components/atoms/SuccessMessage/SuccessMessage"
import SmallSpinner from "app/features/shared/components/atoms/SmallSpinner/SmallSpinner"

type Props = {
  errorMessage?: string
}

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 85px;
  border-top: 1px solid ${ themeColor("tint", "level5") };
`

/**
 * Renders a submit button in a fixed-positioned container
 */
const FixedSubmitButton: React.FC<Props> = ({ errorMessage }) => {
  const { submitSucceeded, submitting, hasValidationErrors, dirty, dirtySinceLastSubmit } = useFormState()

  return (
    <div>
      <FixedBox hAlign="flex-end" vAlign="center" p={ 4 } bgColor="level1">
        { errorMessage && !dirtySinceLastSubmit && <ErrorMessage text={ errorMessage! } /> }
        { submitSucceeded && !submitting && !dirty && !errorMessage && <SuccessMessage text="Succesvol bewaard" /> }
        { submitting && <SmallSpinner /> }
        <Box pl={ 3 } width="auto">
          <Button variant="secondary" disabled={ submitting || hasValidationErrors }>Bewaren</Button>
        </Box>
      </FixedBox>
    </div>
  )
}

export default FixedSubmitButton
