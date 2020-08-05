import {useCallback, useState} from "react";

export const useToggle = (initialValue:boolean) => {
  const [ active, setActive ] = useState(initialValue)
  const toggle = useCallback(() => setActive(!active), [ active, setActive ])
  return [active, toggle] as const
}
