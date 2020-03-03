declare type Email = string
declare type Password = string
declare type AuthToken = string
declare type OAuthToken = AuthToken | undefined
declare type DecodedAuthToken = {
  token_type: string
  exp: 1583239133
  jti: string
  user_id: string
}

declare type IsAuthenticatedResponse = {
  is_authenticated: boolean
}
