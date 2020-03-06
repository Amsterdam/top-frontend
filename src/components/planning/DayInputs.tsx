import React, { FC } from "react"
import styled from "styled-components"
import NumberInput from "./NumberInput"

type Props = {
  title?: string
  inputs: Inputs
}

const Div = styled.div`
  margin-bottom: 12px
`

const Label = styled.label`
  font-weight: bold
  display: inline-block
  width: 150px
`

const DayInputs: FC<Props> = ({ title, inputs }) => {

  const showTitle = title !== undefined

  return (
    <Div className="DayInputs">
      { showTitle &&
        <Label>{ title }</Label>
      }
      {
        inputs.map((input, index) => {
          const [value, onChange] = input
          return <NumberInput key={ index } value={ value } onChange={ onChange } />
        })
      }
    </Div>
  )
}
export default DayInputs
