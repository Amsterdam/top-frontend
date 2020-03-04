import { createContext } from "react"
import noop from "../lib/utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"
import { initialState as parseState } from "../state/parseReducer"
import { initialState as planningState } from "../state/planningReducer"

type Value = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions
    hasItinerary: (a: CaseId) => boolean
    getItineraryNote: (a: Id, b: Id) => ONote

    search: SearchState
    searchActions: SearchActions

    parse: ParseState
    parseActions: ParseActions

    planning: PlanningState
    planningActions: PlanningActions

    isAnonymous: boolean
    toggleIsAnonymous: () => void

    authenticate: (a: AuthToken, b: AuthUser) => void

    isInitialized: boolean

    clear: (a?: ErrorMessage) => void
  }
}

const value = {
  state: {
    auth: authState,
    authActions: {
      initialize: async () => false,
      authenticate: (a: AuthToken, b: AuthUser) => false,
      unAuthenticate: noop,
    },

    itineraries: itinerariesState,
    itinerariesActions: {
      initialize: noop,
      add: noop,
      addMany: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },
    hasItinerary: () => false,
    getItineraryNote: (a: Id, b: Id) => undefined,

    search: searchState,
    searchActions: {
      search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => {},
      clear: noop
    },

    parse: parseState,
    parseActions: {
      parse: (a: string) => {},
      clear: noop
    },

    planning: planningState,
    planningActions: {
      initialize: noop,
      generate: (a: any) => {},
      clear: noop,
      removeItinerary: (a: CaseId) => {},
      addItinerary: (a: CaseId, b: CaseId) => {}
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,

    authenticate: (a: AuthToken, b: AuthUser) => {},

    isInitialized: false,

    clear: (a?: ErrorMessage) => {}
  }
} as Value

const StateContext = createContext(value)

export default StateContext
