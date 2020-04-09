import { useState } from "react"

const useOnChangeStateMultipleCheckboxes = (defaultState: string[] = []) : [string[], OnChangeHandler, SetState] => {
  const [state, setState] = useState<string[]>(defaultState)
  const addToState = (value: string) => setState(state.concat(value))
  const removeFromState = (value: string) => setState(state.filter(s => s !== value))
  const onChange = (event: ChangeEventInput) => {
    const values = (Array.from(event.target.options) as { selected: boolean, value: string }[])
      .filter(option => option.selected)
      .map(option => option.value)
    setState(values)
  }
  return [state, onChange, setState]
}

export default useOnChangeStateMultipleCheckboxes
