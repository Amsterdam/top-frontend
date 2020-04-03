import { createContext } from "react"
import noop from "../lib/utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"
import { initialState as planningSettingsState } from "../state/planningSettingsReducer"
import { initialState as usersState } from "../state/usersReducer"

export type StateContextValue = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions
    hasItinerary: (a: CaseId) => boolean
    getItineraryNote: (a: Id, b: Id) => ONote

    search: SearchState
    searchActions: SearchActions

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
      create: (a: any, b: UUIDs, c: number, d: boolean) => undefined,
      updateTeam: (a: Id, b: UUIDs, c?: boolean) => undefined,
      del: (a: Id) => undefined,
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
} as StateContextValue

const StateContext = createContext(value)

export default StateContext
