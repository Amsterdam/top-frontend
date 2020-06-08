import React from "react"
import styled from "styled-components"
import { Button, themeColor } from "@datapunt/asc-ui"
import Box from "../../atoms/Box/Box"
import { useFormState } from "react-final-form"
import ErrorMessage from "../../global/ErrorMessage"
import SuccessMessage from "../../global/SuccessMessage"
import SmallSpinner from "../../global/SmallSpinner"

type Props = {
  errorMessage?: string
}

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 85px;
  border-top: 1px solid ${ themeColor("tint", "level5") };
`

/**
 * Renders a submit-button in a fixed-positioned container
 */
const FixedSubmitButton: React.FC<Props> = ({ errorMessage }) => {
  const { submitSucceeded, dirty, submitting, hasValidationErrors } = useFormState()

  return (
    <div>
      <FixedBox hAlign='flex-end' vAlign='center' p={4} bgColor='level1'>
        { errorMessage && <ErrorMessage text={ errorMessage! } /> }
        { submitSucceeded && !dirty && !submitting && !errorMessage && <SuccessMessage text='Succesvol opgeslagen' /> }
        { submitting && <SmallSpinner />}
        <Box pl={3} width='auto'>
          <Button variant="secondary" disabled={submitting || hasValidationErrors}>Bewaren</Button>
        </Box>
      </FixedBox>
    </div>
  )
}


export default FixedSubmitButton
