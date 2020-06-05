declare type ItinerariesActions = {
  initialize: () => void
  create: (a: any, d: boolean ) => void
  updateTeam: (a: Id, b: UUIDs, c?: boolean) => void
  del: (a: Id) => void
  add: (a: Id, b: CaseId) => void
  move: (a: Id, b: Index, c: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
  setChecked: (a: Id, b: boolean) => void
}

declare type AuthActions = {
  initialize: () => Promise<boolean>
  authenticate: (a: AuthToken, b: AuthUser) => boolean
  unAuthenticate: (a: boolean, b?: ErrorMessage) => void
}

declare type SearchActions = {
  search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => void
  getSuggestions: (a: Id) => void
  getIssues: () => void
  setTeam: (a: CaseId, b?: TeamMembers) => void
  clear: () => void
}

declare type UsersActions = {
  initialize: () => void
  clear: () => void
}
