declare type StateContextValue = {
  state: {
    auth: AuthState
    authActions: AuthActions

    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions
    hasItinerary: (caseId: CaseId) => boolean
    getItineraryNotes: (itineraryItemId: Id, id: Id) => Notes | undefined
    getItineraryFromItineraryItem: (id: Id) => OItinerary

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
