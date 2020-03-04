import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"
import useParse from "../../state/useParse"
import usePlanning from "../../state/usePlanning"
import parseLocationSearch from "../../lib/utils/parseLocationSearch"
import { isLoginCallbackPage } from "../../config/page"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth()

  // itineraries
  const [itineraries, itinerariesActions] = useItineraries()
  const getItinerary = (caseId: CaseId) : OItinerary => itineraries.itineraries.find(itinerary => itinerary.case.bwv_data.case_id === caseId)
  const hasItinerary = (caseId: CaseId) => getItinerary(caseId) !== undefined
  const getItineraryNote = (itineraryId: Id, id: Id) : ONote => {
    const itinerary = itineraries.itineraries.find(itinerary => itinerary.id === itineraryId)
    if (itinerary === undefined) return
    return itinerary.notes.find(note => note.id === id)
  }

  // search
  const [search, searchActions] = useSearch()

  // parse
  const [parse, parseActions] = useParse()

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  // planning
  const [planning, planningActions] = usePlanning()

  // authenticate
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
  }

  // clear
  const clear = (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()
    authActions.unAuthenticate(shouldNavigateToLogin, errorMessage)
    itinerariesActions.clear()
    planningActions.clear()
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
