import useItineraries from "../../../state/useItineraries"
import useAuth from "../../../state/useAuth"
import useSearch from "../../../state/useSearch"
import useUsers from "../../../state/useUsers"
import useProjects from "../../../state/useProjects"
import useStadia from "../../../state/useStadia"
import useSettings from "../../../state/useSettings"
import usePlanningSettings from "../../../state/usePlanningSettings"
import useCreateClearFunction from "./hooks/useCreateClearFunction"
import useCreateInitializeFunction from "./hooks/useCreateInitializeFunction"
import useCreateAnonymousHandlers from "./hooks/useCreateAnonymousHandlers"
import useCreateAuthenticateFunction from "./hooks/useCreateAuthenticateFunction"

const useCreateGlobalState = () => {
  // State-slices and actions
  const [itineraries, itinerariesActions, { hasItinerary, getItineraryNotes, getItineraryFromItineraryItem }] = useItineraries()
  const [auth, authActions] = useAuth()
  const [search, searchActions] = useSearch()
  const [users, usersActions] = useUsers()
  const [projects, projectsActions] = useProjects()
  const [stadia, stadiaActions] = useStadia()
  const [settings, settingsActions] = useSettings()

  // Anonymous handlers:
  const { isAnonymous, setIsAnonymous, toggleIsAnonymous } = useCreateAnonymousHandlers()

  // Are we initialized yet?
  const isInitialized = auth.isInitialized && itineraries.isInitialized

  // Create clear function:
  const clear = useCreateClearFunction(
    authActions.unAuthenticate,
    [itinerariesActions.clear, usersActions.clear]
  )

  // Create initialize function:
  const initialize = useCreateInitializeFunction(
    authActions.initialize,
    clear,
    setIsAnonymous,
    [
      itinerariesActions.initialize,
      usersActions.initialize,
      projectsActions.index,
      stadiaActions.index,
      settingsActions.index
    ]
  )

  // Create authenticate function:
  const authenticate = useCreateAuthenticateFunction(authActions, initialize)

  return {
    initialize,
    state: {
      isInitialized,
      isAnonymous,
      auth,
      itineraries,
      search,
      projects,
      stadia,
      settings,
      users
    },
    actions: {
      authActions,
      itinerariesActions,
      hasItinerary,
      getItineraryNotes,
      getItineraryFromItineraryItem,
      searchActions,
      projectsActions,
      stadiaActions,
      settingsActions,
      usersActions,
      toggleIsAnonymous,
      authenticate,
      clear
    }
  }
}

export default useCreateGlobalState
