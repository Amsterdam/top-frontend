import React, {FC, ReactNode, useState, useEffect, useRef} from "react"
import StateContext from '../../contexts/StateContext'
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"
import useParse from "../../state/useParse"
import usePlanning from "../../state/usePlanning"
import usePlanningSettings from "../../state/usePlanningSettings"
import useUsers from "../../state/useUsers"
import parseLocationSearch from "../../lib/utils/parseLocationSearch"
import { isLoginCallbackPage } from "../../config/page"
import useCreateClearFunction from "./hooks/useCreateClearFunction";
import useCreateInitializeFunction from "./hooks/useCreateInitializeFunction";

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {
  // auth
  const [itineraries, itinerariesActions, { hasItinerary, getItineraryNote }] = useItineraries()
  const [auth, authActions] = useAuth()
  const [search, searchActions] = useSearch()
  const [parse, parseActions] = useParse()
  const [planning, planningActions] = usePlanning()
  const [users, usersActions] = useUsers()
  const [planningSettings, planningSettingsActions] = usePlanningSettings()

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  const authenticate = (token: AuthToken, user: AuthUser) => {
    const isSuccess = authActions.authenticate(token, user)
    if (isSuccess) initialize()
  }

  const clear = useCreateClearFunction(
    authActions,
    [itinerariesActions, planningActions, usersActions]
  )

  const isInitialized = auth.isInitialized && itineraries.isInitialized

  const initialize = useCreateInitializeFunction(
    isInitialized,
    authActions,
    clear,
    [itinerariesActions, planningActions, planningSettingsActions, usersActions]
  )

  // initialization
  useEffect(() => {
    const { anonymous } = parseLocationSearch(window.location.search)
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    initialize()
  }, [initialize])

  const value = {
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

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
