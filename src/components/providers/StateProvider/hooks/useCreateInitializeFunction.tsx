import { useCallback } from "react"
import { GlobalStateClearFunction } from "./useCreateClearFunction"
import parseLocationSearch from "../../../../lib/utils/parseLocationSearch"
import authToken from "../../../../lib/authToken"

export type StateContextInitializer = (errorMessage?: ErrorMessage) => void
type Initializable = () => void

const useCreateInitializeFunction = (
  authInitializer: () => Promise<boolean>,
  clear: GlobalStateClearFunction,
  setIsAnonymous: (bool: boolean) => void,
  initializables: Initializable[]
): StateContextInitializer => {
  const token = authToken.get()
  const initialize = async () => {
    const isAuthenticated = await authInitializer()
    if (!isAuthenticated) return clear()

    // Set anonymous?
    const { anonymous } = parseLocationSearch(window.location.search)
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    if (token === undefined) return
    initializables.forEach(initialize => initialize())
  }
  return useCallback(initialize, [token])
}


export default useCreateInitializeFunction
