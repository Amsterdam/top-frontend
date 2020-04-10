import { useState } from "react"

const useOnChangeStateMultiple = (defaultState: string[] = []) : [string[], OnChangeHandler, SetState] => {
  const [state, setState] = useState<string[]>(defaultState)
  const onChange = (event: ChangeEventInput) => {
    const values = (Array.from(event.target.options) as { selected: boolean, value: string }[])
      .filter(option => option.selected)
      .map(option => option.value)
    setState(values)
  }
  return [state, onChange, setState]
}

export default useOnChangeStateMultiple
