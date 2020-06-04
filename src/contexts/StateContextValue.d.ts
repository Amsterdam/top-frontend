declare type StateContextValue = {
  state: {
    isInitialized: boolean
    auth: AuthState
    isAnonymous: boolean
    itineraries: ItinerariesState
    search: SearchState
    projects: typeof API.Project.name
    stadia: typeof API.Stadia.name
    settings: API.planningSettings
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
