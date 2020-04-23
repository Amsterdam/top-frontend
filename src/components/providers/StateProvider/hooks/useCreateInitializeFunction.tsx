import { GlobalStateClearFunction } from "./useCreateClearFunction"
import parseLocationSearch from "../../../../lib/utils/parseLocationSearch"
import { useRef } from "react"

export type StateContextInitializer = (errorMessage?: ErrorMessage) => void
type Initializable = () => void

const useCreateInitializeFunction = (
  authInitializer: () => Promise<boolean>,
  clear: GlobalStateClearFunction,
  setIsAnonymous: (bool: boolean) => void,
  initializables: Initializable[]
): StateContextInitializer => {
  const initializeFunction = async () => {
    const isAuthenticated = await authInitializer()
    if (!isAuthenticated) return clear()

    // Set anonymous?
    const { anonymous } = parseLocationSearch(window.location.search)
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    initializables.forEach(initialize => initialize())
  }

  // We wrap the initialize function in a 'ref' to ensure it never re-triggers a hook:
  // The initialize-function itself should never change.

  const ref = useRef(initializeFunction)
  return ref.current
}


export default useCreateInitializeFunction
