import { createContext } from "react"
import noop from "../lib/utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"
import { initialState as parseState } from "../state/parseReducer"
import { initialState as planningState } from "../state/planningReducer"
import { initialState as planningSettingsState } from "../state/planningSettingsReducer"
import { initialState as usersState } from "../state/usersReducer"

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

    planningSettings: PlanningSettingsState
    planningSettingsActions: PlanningSettingsActions
    users: UsersState
    usersActions: UsersActions

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
      create: async (a: any, b: UUIDs, c: number) => undefined,
      updateTeam: async (a: Id, b: UUIDs) => undefined,
      del: async (a: Id) => undefined,
      add: (a: Id, b: CaseId) => undefined,
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
      getSuggestions: (a: Id) => {},
      setTeam: (a: CaseId, b?: TeamMembers) => {},
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

    planningSettings: planningSettingsState,
    planningSettingsActions: {
      initialize: noop,
      clear: noop,
      saveSettings: (a: string, b: string[]) => {}
    },

    users: usersState,
    usersActions: {
      initialize: noop,
      clear: noop
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
