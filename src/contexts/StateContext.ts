import { createContext } from "react"
import type { ItemsState, RecordState } from "globalstate-hooks"

export type StateContext = {
  state: {
    isInitialized: boolean
    auth: AuthState
    isAnonymous: boolean
    itineraries: ItinerariesState
    search: SearchState
    projects: ItemsState<Project>
    stadia: ItemsState<Stadium>
    settings: RecordState<API.PlannerSettings>
    users: UsersState
  }
  actions: {
    authActions: AuthActions
    itinerariesActions: ItinerariesActions
    hasItinerary: (caseId: CaseId) => boolean
    getItineraryNotes: (itineraryItemId: Id, id: Id) => Notes | undefined
    getItineraryFromItineraryItem: (id: Id) => OItinerary
    settingsActions: any
    searchActions: SearchActions
    usersActions: UsersActions
    toggleIsAnonymous: () => void
    authenticate: (a: AuthToken, b: AuthUser) => void
    clear: (a?: ErrorMessage) => void
  }
}

export default createContext<StateContext | undefined>(undefined)
