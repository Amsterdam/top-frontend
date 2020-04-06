import React, {MouseEvent, useEffect, useState} from "react"
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
const SIZE = WIDTH - PADDING*2 - MARGIN*2 - BORDER_WIDTH*2

const StyledSpinner = styled(Spinner)`  
  padding: ${PADDING}px;
  border: ${BORDER_WIDTH}px solid black;  
  margin: ${MARGIN}px;
`

const SpinnerCheckbox:React.FC<Props> = ({ onChange, checked }) => {
  const [ isLoading, setIsLoading ] = useState(false)

  const handleOnChange = (event:MouseEvent<HTMLInputElement>) => {
    // Whenever the user makes a change, setIsLoading `true`.
    setIsLoading(true)
    onChange(event)
  }

  useEffect(() => {
    // Whenever 'checked' changes, setIsLoading `false`.
    setIsLoading(false)
  }, [checked, setIsLoading])

  return isLoading
    ? (<StyledSpinner size={SIZE} />)
    : (<Checkbox checked={checked} onChange={handleOnChange} />)
}

export default SpinnerCheckbox
