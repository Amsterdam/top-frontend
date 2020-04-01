import {GlobalStateClearFunction} from "./useCreateClearFunction"
import parseLocationSearch from "../../../../lib/utils/parseLocationSearch"

export type StateContextInitializer = (errorMessage?: ErrorMessage) => void
type Initializable = () => void

const useCreateInitializeFunction = (
  authInitializer: () => Promise<boolean>,
  clear: GlobalStateClearFunction,
  setIsAnonymous: (bool: boolean) => void,
  initializables: Initializable[]
): StateContextInitializer => async () => {
  const isAuthenticated = await authInitializer()
  if (!isAuthenticated) return clear()

  // Set anonymous?
  const {anonymous} = parseLocationSearch(window.location.search)
  const isAnonymous = anonymous === "1"
  setIsAnonymous(isAnonymous)

  initializables.forEach(initialize => initialize())
}


export default useCreateInitializeFunction
