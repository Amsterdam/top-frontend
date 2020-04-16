import { useState, useEffect } from "react"
import arraysEqual from "../lib/utils/arraysEqual"

const useInputState = (value = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(value)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  useEffect(() => setState(value), [value])
  return [state, onChange, setState]
}
export default useInputState

export const useInputStatePlural = (defaultState: string[] = []) : [string[], OnChangeHandler, SetState] => {
  const [firstDefaultState] = useState(defaultState)

  const [state, setState] = useState(defaultState)

  const onChange = (event: ChangeEventInput) => {
    const values = (Array.from(event.target.options) as { selected: boolean, value: string }[])
      .filter(option => option.selected)
      .map(option => option.value)
    setState(values)
  }

  useEffect(() => {
    if (arraysEqual(firstDefaultState, defaultState)) return
    setState(defaultState)
  }, [firstDefaultState, defaultState])

  return [state, onChange, setState]
}
