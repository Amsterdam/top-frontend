import { useState, useEffect } from "react"

const useOnChangeStateAsync = (value = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(value)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  useEffect(() => setState(value), [value])
  return [state, onChange, setState]
}
export default useOnChangeStateAsync
