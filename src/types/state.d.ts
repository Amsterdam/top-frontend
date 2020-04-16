declare type ErrorMessage = string
declare type OErrorMessage = ErrorMessage | undefined

declare type ItinerariesState = {
  isFetching: boolean
  isInitialized: boolean
  errorMessage?: ErrorMessage
  itineraries: Itineraries
}

declare type ItinerariesActions = {
  initialize: () => void
  create: (a: any, b: UUIDs, c: number, d: boolean ) => void
  updateTeam: (a: Id, b: UUIDs, c?: boolean) => void
  del: (a: Id) => void
  add: (a: Id, b: CaseId) => void
  move: (a: Id, b: Index, c: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
  setChecked: (a: Id, b: boolean) => void
}

declare type ItinerariesSelectors = {
  getItinerary: (caseId: CaseId) => OItineraryItem
  hasItinerary: (caseId: CaseId) => boolean
  getItineraryNotes: (itineraryItemId: Id, id: Id) => Notes | undefined
  getItineraryFromItineraryItem: (id: Id) => OItinerary
}

declare type AuthState = {
  isInitialized: boolean
  token?: AuthToken
  user?: AuthUser
  errorMessage?: ErrorMessage
}

declare type AuthActions = {
  initialize: () => Promise<boolean>
  authenticate: (a: AuthToken, b: AuthUser) => boolean
  unAuthenticate: (a: boolean, b?: ErrorMessage) => void
}

declare type StreetSuffix = string
declare type Query = [PostalCode, StreetNumberString, StreetSuffix]
declare type SearchState = {
  isFetching: boolean
  query?: Query
  results?: SearchResults
  suggestions?: SearchResults
  issues?: SearchResults
  errorMessage?: ErrorMessage
}

declare type SearchActions = {
  search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => void
  getSuggestions: (a: Id) => void
  getIssues: () => void
  setTeam: (a: CaseId, b?: TeamMembers) => void
  clear: () => void
}

declare type PlanningSettingsState = {
  isFetching: boolean
  isUpdating: boolean
  data?: {
    projects: string[]
    stadia: Stadia
    settings: PlanningSettings
  }
  errorMessage?: ErrorMessage
}

declare type PlanningSettingsActions = {
  initialize: () => void
  clear: () => void
  saveSettings: (a: string, b: string[], c: SettingsLists) => void
}

declare type UsersState = {
  isFetching: boolean
  errorMessage?: ErrorMessage
  results?: Users
}

declare type UsersActions = {
  initialize: () => void
  clear: () => void
}
