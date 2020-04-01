import useItineraries from "../../../state/useItineraries"
import useAuth from "../../../state/useAuth"
import useSearch from "../../../state/useSearch"
import useParse from "../../../state/useParse"
import usePlanning from "../../../state/usePlanning"
import useUsers from "../../../state/useUsers"
import usePlanningSettings from "../../../state/usePlanningSettings"
import useCreateClearFunction from "./hooks/useCreateClearFunction"
import useCreateInitializeFunction, {StateContextInitializer} from "./hooks/useCreateInitializeFunction"
import {StateContextValue} from "../../../contexts/StateContext"
import useCreateAnonymousHandlers from "./hooks/useCreateAnonymousHandlers"
import useCreateAuthenticateFunction from "./hooks/useCreateAuthenticateFunction"

type Result = {
  initialize: StateContextInitializer,
  value: StateContextValue
}

const useCreateGlobalState = (): Result => {
  // State-slices and actions
  const [itineraries, itinerariesActions, { hasItinerary, getItineraryNote }] = useItineraries()
  const [auth, authActions] = useAuth()
  const [search, searchActions] = useSearch()
  const [parse, parseActions] = useParse()
  const [planning, planningActions] = usePlanning()
  const [users, usersActions] = useUsers()
  const [planningSettings, planningSettingsActions] = usePlanningSettings()

  // Anonymous handlers:
  const {isAnonymous, setIsAnonymous, toggleIsAnonymous} = useCreateAnonymousHandlers()

  // Are we initialized yet?
  const isInitialized = auth.isInitialized && itineraries.isInitialized

  // Create clear function:
  const clear = useCreateClearFunction(
    authActions.unAuthenticate,
    [itinerariesActions.clear, planningActions.clear, usersActions.clear]
  )

  // Create initialize function:
  const initialize = useCreateInitializeFunction(
    authActions.initialize,
    clear,
    setIsAnonymous,
    [
      itinerariesActions.initialize,
      planningActions.initialize,
      planningSettingsActions.initialize,
      usersActions.initialize
    ]
  )

  // Create authenticate function:
  const authenticate = useCreateAuthenticateFunction(authActions, initialize)

  return {
    initialize,
    value: {
      state: {
        auth,
        authActions,

        itineraries,
        itinerariesActions,
        hasItinerary,
        getItineraryNote,

        search,
        searchActions,

        parse,
        parseActions,

        planning,
        planningActions,

        planningSettings,
        planningSettingsActions,

        users,
        usersActions,

        isAnonymous,
        toggleIsAnonymous,

        authenticate,

        isInitialized,

        clear
      }
    }
  }
}

export default useCreateGlobalState
