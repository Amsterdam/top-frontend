import React, {MouseEvent, useCallback, useEffect, useState} from "react"
import styled from "styled-components"
import { Checkbox, Spinner  } from "@datapunt/asc-ui"

type Props = {
  checked: boolean
  onChange: (event:MouseEvent<HTMLInputElement>)=> void
}

// Because Spinner `size` is somewhat magically calculated
// I had to destruct the following variables:
const BORDER_WIDTH = 1
const PADDING = 2
const MARGIN = 6
const WIDTH = 36

// Calculate spinner size:
const SIZE = WIDTH - PADDING * 2 - MARGIN * 2 - BORDER_WIDTH * 2

const StyledSpinner = styled(Spinner)`
  padding: ${PADDING}px;
  border: ${BORDER_WIDTH}px solid black;  
  margin: ${MARGIN}px;
`

const Wrap = styled.div`
  cursor: pointer;
`

const SpinnerCheckbox:React.FC<Props> = ({ onChange, checked }) => {
  const [ isSpinning, setIsSpinning ] = useState(false)

  const handleOnChange = useCallback((event:MouseEvent<HTMLInputElement>) => {
    // Whenever the user makes a change, setIsSpinning `true`.
    setIsSpinning(true)
    onChange(event)
  }, [setIsSpinning, onChange])

  useEffect(() => {
    // Whenever 'checked' changes, setIsSpinning `false`.
    setIsSpinning(false)
  }, [checked, setIsSpinning])

  return <Wrap>
    { isSpinning
      ? (<StyledSpinner size={SIZE} />)
      : (<Checkbox checked={checked} onChange={handleOnChange} />)}
  </Wrap>
}

export default SpinnerCheckbox
