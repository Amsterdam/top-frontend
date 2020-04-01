import {useCallback, useState} from "react"

const useCreateAnonymousHandlers = () => {
  const [isAnonymous, setIsAnonymous] = useState(false)

  const toggleIsAnonymous = useCallback(
    () => setIsAnonymous(!isAnonymous),
    [isAnonymous]
  )

  return { isAnonymous, setIsAnonymous, toggleIsAnonymous }
}

export default useCreateAnonymousHandlers
