import { useState, useEffect } from "react"
import arraysEqual from "../lib/utils/arraysEqual"

const useOnChangeStateAsync = (value = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(value)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  useEffect(() => setState(value), [value])
  return [state, onChange, setState]
}
export default useOnChangeStateAsync

export const useOnChangeStateMultipleAsync = (defaultState: string[] = []) : [string[], OnChangeHandler, SetState] => {
  const [state, setState] = useState(defaultState)
  const onChange = (event: ChangeEventInput) => {
    const values = (Array.from(event.target.options) as { selected: boolean, value: string }[])
      .filter(option => option.selected)
      .map(option => option.value)
    setState(values)
  }
  useEffect(() => {
    if (arraysEqual(state, defaultState)) return
    setState(defaultState)
  }, [defaultState, state])
  return [state, onChange, setState]
}
