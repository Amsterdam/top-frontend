import {useState} from "react"

const useCreateAnonymousHandlers = () => {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)
  return { isAnonymous, setIsAnonymous, toggleIsAnonymous }
}

export default useCreateAnonymousHandlers
