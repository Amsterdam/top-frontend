import { useState, useEffect } from "react"
import arraysEqual from "../lib/utils/arraysEqual"

const useInputState = (value = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(value)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  useEffect(() => setState(value), [value])
  return [state, onChange, setState]
}
export default useInputState

export const useInputStatePlural = (defaultState: string[] = []) : [string[], OnChangeHandlerHOF, SetState] => {
  const [firstDefaultState] = useState(defaultState)

  const [state, setState] = useState(defaultState)

  const onChangeHOF = (option: string) => (event: ChangeEventInput) => {
    const add = () => setState(state.concat(option))
    const remove = () => setState(state.filter(item => item !== option))
    event.target.checked ? add() : remove()
  }

  useEffect(() => {
    if (arraysEqual(firstDefaultState, defaultState)) return
    setState(defaultState)
  }, [firstDefaultState, defaultState])

  return [state, onChangeHOF, setState]
}
