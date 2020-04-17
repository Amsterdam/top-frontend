import React, {MouseEvent, useCallback, useEffect, useState} from "react"
import styled from "styled-components"
import { Checkbox, Spinner, color } from "@datapunt/asc-ui"

type Props = {
  checked: boolean
  onChange: (event:MouseEvent<HTMLInputElement>)=> void
}

// Calculate spinner size:
const BORDER_WIDTH = 1
const DIM = 24
const SIZE = DIM - 2 * BORDER_WIDTH

const SpinnerWrap = styled.div`
  border: 1px solid ${ color("tint", "level7" ) };
  margin: 6px;
  width: ${ DIM }px;
  height: ${ DIM }px;
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
      ? (<SpinnerWrap><Spinner size={ SIZE } /></SpinnerWrap>)
      : (<Checkbox checked={checked} onChange={handleOnChange} />)}
  </Wrap>
}

export default SpinnerCheckbox
