import { useState } from "react"

const useOnChangeState = (defaultState = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(defaultState)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange, setState]
}
export default useOnChangeState

export const useOnChangeStateDate = (defaultState: Date) => {
  const [state, setState] = useState<Date>(defaultState)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange, setState]
}
