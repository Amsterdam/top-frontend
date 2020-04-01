import React, { FC, ReactNode, useState, useEffect } from "react"
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

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth()

  // itineraries
  const [itineraries, itinerariesActions, { hasItinerary, getItineraryNote }] = useItineraries()

  // search
  const [search, searchActions] = useSearch()

  // parse
  const [parse, parseActions] = useParse()

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)

  // TODO make own hook for this one:
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  // planning
  const [planning, planningActions] = usePlanning()

  // planning settings
  const [planningSettings, planningSettingsActions] = usePlanningSettings()

  // users
  const [users, usersActions] = useUsers()

  // TODO make own hook for this one:
  const authenticate = (token: AuthToken, user: AuthUser) => {
    const isSuccess = authActions.authenticate(token, user)
    if (isSuccess) initialize()
  }

  // initialize
  const isInitialized = auth.isInitialized && itineraries.isInitialized
  const initialize = async () => {
    if (isInitialized) return

    const isAuthenticated = await authActions.initialize()
    if (!isAuthenticated) return clear()

    itinerariesActions.initialize()
    planningActions.initialize()
    planningSettingsActions.initialize()
    await usersActions.initialize()
  }

  // clear
  const clear = (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()
    authActions.unAuthenticate(shouldNavigateToLogin, errorMessage)
    itinerariesActions.clear()
    planningActions.clear()
    usersActions.clear()
  }

  // initialization
  useEffect(() => {
    const { anonymous } = parseLocationSearch(window.location.search)
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    initialize()
  }, [])

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
