declare type AuthToken = string
declare type OAuthToken = AuthToken | undefined
declare type DecodedAuthToken = {
  token_type: string
  exp: number
  jti: string
  user_id: string
}
declare type Email = string
declare type AuthUser = {
  firstName: string
  email: Email
}
declare type OAuthUser = AuthUser | undefined

declare type IsAuthenticatedResponse = {
  is_authenticated: boolean
}
