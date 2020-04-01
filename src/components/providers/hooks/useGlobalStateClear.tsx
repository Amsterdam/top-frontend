import {useCallback, useRef} from "react";

import {isLoginCallbackPage} from "../../../config/page";
import useAuth from "../../../state/useAuth";
import useItineraries from "../../../state/useItineraries";
import usePlanning from "../../../state/usePlanning";
import useUsers from "../../../state/useUsers";

type Result = (errorMessage?: ErrorMessage) => void

const useGlobalStateClear = ():Result => {

  const [auth, authActions] = useAuth()
  const [itineraries, itinerariesActions] = useItineraries()
  const [planning, planningActions] = usePlanning()
  const [users, usersActions] = useUsers()

  const ref = useRef({
    unAuthenticate: authActions.unAuthenticate,
    clearItineraries: itinerariesActions.clear,
    clearPlanning: planningActions.clear,
    clearUsers: usersActions.clear,
  })

  return useCallback((errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()
    const { current } = ref
      current.unAuthenticate(shouldNavigateToLogin, errorMessage)
      current.clearItineraries()
      current.clearPlanning()
      current.clearUsers()
    }, [ref])
}

export default useGlobalStateClear
