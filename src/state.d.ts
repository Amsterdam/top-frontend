declare type ErrorMessage = string
declare type OErrorMessage = ErrorMessage | undefined

declare type ItinerariesState = {
  isFetching: boolean
  isInitialized: boolean
  itineraries: Itineraries
  errorMessage?: ErrorMessage
}

declare type ItinerariesActions = {
  initialize: () => void
  add: (a: CaseId) => void
  addMany: (a: CaseIds) => void
  move: (a: Index, b: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
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
  errorMessage?: ErrorMessage
}

declare type SearchActions = {
  search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => void
  clear: () => void
}

declare type ParseState = {
  isFetching: boolean
  query?: string
  results?: SearchResults
  errorMessage?: ErrorMessage
}

declare type ParseActions = {
  parse: (a: string) => void
  clear: () => void
}

declare type PlanningState = {
  isFetching: boolean
  results?: PlanningData
  timestamp?: Date
  errorMessage?: ErrorMessage
}

declare type PlanningActions = {
  initialize: () => void
  generate: (a: any) => void
  clear: () => void
  removeItinerary: (a: CaseId) => void
  addItinerary: (a: CaseId, b: CaseId) => void
}

declare type PlanningSettingsState = {
  isFetching: boolean
  isUpdating: boolean
  data?: {
    projects: string[]
    stadia: Stadia
    settings: any
  }
  errorMessage?: ErrorMessage
}

declare type PlanningSettingsActions = {
  initialize: () => void
  clear: () => void
  saveSettings: (a: string, b: string[]) => void
}
