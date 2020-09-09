import React, { useCallback, useMemo, useState } from "react"
import { useField } from "react-final-form"
import { Dimensions, Responsive, UnboundSelectField, ComposedField, isRequired, UnboundTextField } from "amsterdam-react-final-form"
import { getCurrentTime } from "app/features/visits/components/organisms/NoteWizard/utils/getCurrentTime"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"

export type CurrentTimeProps = {
  position?: Responsive<Dimensions>
  label: string
  name: string
  initialValue?: string
}

const Wrap = styled.div`
  margin: 0 ${ themeSpacing(-2) };
`

const CurrentTime: React.FC<CurrentTimeProps> = ({ position, name, label, initialValue }) => {
  const [ choice, setChoice ] = useState<string|undefined>()
  const { input } = useField(name, { initialValue: initialValue, validate: isRequired() })

  const handleChoice = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    const choice = e.currentTarget.value
    setChoice(choice)
    input.onChange({ target: { value: choice === "now" ? getCurrentTime() : undefined } })
  }, [ setChoice, input ])

  const handleTextFieldChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    input.onChange({ target: { value: e.currentTarget.value } })
  }, [ input ])

  const options = useMemo(() => ({
    "now": `Nu (${ getCurrentTime() })`,
    "other": "Anders..."
  }), [])

  const selectValue = input.value && input.value === getCurrentTime()
    ? "now"
    : input.value
      ? "other"
      : undefined

  return (
    <ComposedField position={position} label={label}>
      <Wrap>
        <UnboundSelectField onChange={handleChoice} withEmptyOption={true} options={options} value={selectValue} />
        { (choice === "other" || (input.value && input.value !== getCurrentTime())) &&
          <UnboundTextField type="time" onChange={handleTextFieldChange} value={input.value} autoFocus={ true } />
        }
      </Wrap>
    </ComposedField>
  )
}

export default CurrentTime
