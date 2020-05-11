declare type StateContextValue = {
  state: {
    isInitialized: boolean
    auth: AuthState
    isAnonymous: boolean
    itineraries: ItinerariesState
    search: SearchState
    planningSettings: PlanningSettingsState
    users: UsersState
  }
  actions: {
    authActions: AuthActions
    itinerariesActions: ItinerariesActions
    hasItinerary: (caseId: CaseId) => boolean
    getItineraryNotes: (itineraryItemId: Id, id: Id) => Notes | undefined
    getItineraryFromItineraryItem: (id: Id) => OItinerary
    searchActions: SearchActions
    planningSettingsActions: PlanningSettingsActions
    usersActions: UsersActions
    toggleIsAnonymous: () => void
    authenticate: (a: AuthToken, b: AuthUser) => void
    clear: (a?: ErrorMessage) => void
  }
}
