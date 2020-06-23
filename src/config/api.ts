import { isProduction, isAcc, forceAcc } from "./environment"
import queryParams from "../lib/utils/queryParams"
import { basepath } from "./page"

const domain =
  isProduction ? "https://api.top.amsterdam.nl/" :
  isAcc || forceAcc ? "https://acc.api.top.amsterdam.nl/" :
  "http://localhost:8000/"
const apiPath = "api/v1/"
const authPath = "credentials-authenticate/"
const authOIDCPath = "oidc-authenticate/"
const isAuthenticatedPath = "is-authenticated/"

const config = {
  domain,
  apiPath,
  authPath,
  isAuthenticatedPath,
  authOIDCPath
}
export default config

export const getUrl = (path: string, params?: QueryParams) => {
  const { domain, apiPath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  const url = `${ domain }${ apiPath }${ path }${ shouldAppendSlash ? "/" : "" }`
  return `${ url }${ params ? queryParams(params) : "" }`
}

export const getAuthUrl = () => getUrl(authPath)

export const getAuthOIDCUrl = () => getUrl(authOIDCPath)

export const getIsAuthenticatedUrl = () => getUrl(isAuthenticatedPath)

export const getOIDCProviderUrl = () => {
  const authorizeUri = "https://auth.grip-on-it.com/v2/rjsfm52t/oidc/idp/authorize"
  const responseType = "code"
  const scope = "openid"
  const clientId = isProduction ? "65ba2077-9c90-4fcd-be2a-f7549e783bdc" : "d3d664c7-bb33-4bf0-b7c9-b8bdf1199b76"

  const redirectProtocol = isProduction || isAcc ? "https://" : "http://"
  const redirectDomain =
    isProduction ? "top.amsterdam.nl" :
    isAcc ? "acc.top.amsterdam.nl" :
    forceAcc ? "localhost:3001" :
    "localhost:3000"
  const redirectUri = `${ redirectProtocol }${ redirectDomain }${ basepath }authentication/callback`
  const queryParamsString = queryParams({
    response_type: responseType,
    scope,
    client_id: clientId,
    redirect_uri: redirectUri
  })
  return `${ authorizeUri }${ queryParamsString }`
}

export const getLogoutUrl = () => "https://auth.grip-on-it.com/v2/logout?tenantId=rjsfm52t"

export const authOIDDummyCode = "1234567890abcdefghijkl"
