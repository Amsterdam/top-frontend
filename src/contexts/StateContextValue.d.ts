declare type StateContextValue = {
  state: {
    auth: AuthState
    authActions: AuthActions

    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions
    hasItinerary: (a: CaseId) => boolean
    getItineraryNotes: (a: Id, b: Id) => Notes | undefined
    getItineraryFromItineraryItem: (a: Id) => OItinerary

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
