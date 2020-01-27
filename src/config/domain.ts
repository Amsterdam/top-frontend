import parseLocationSearch from "../lib/utils/parseLocationSearch"
import queryParams from "../lib/utils/queryParams"
import pick from "../lib/utils/pick"

const hostname = window.location.hostname
const api = parseLocationSearch(window.location.search).api
const isAcc = api === "acc"

const domain =
  hostname === "acc.straatnotes.amsterdam.nl" ? "https://acc.api.straatnotes.amsterdam.nl/" :
  hostname === "top.amsterdam.nl" ? "https://top.amsterdam.nl/" :
  isAcc ? "https://acc.api.straatnotes.amsterdam.nl/" :
  "http://localhost:8000/"
const basePath = "api/v1/"
const authPath = "credentials-authenticate/"
const isAuthenticatedPath = "is-authenticated/"
const authOIDCPath = "oidc-authenticate/"
const pathPrefix =
  hostname === "top.amsterdam.nl" ? "api/" :
  hostname === "acc.straatnotes.amsterdam.nl" || isAcc ? "looplijsten/" :
  ""

const config = {
  domain,
  pathPrefix,
  basePath,
  authPath,
  isAuthenticatedPath,
  authOIDCPath
}
export default config

export const getUrl = (path: string, params?: QueryParams) => {
  const { domain, pathPrefix, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  const url = `${ domain }${ pathPrefix }${ basePath }${ path }${ shouldAppendSlash ? "/" : "" }`
  return `${ url }${ params ? queryParams(params) : "" }`
}

export const getIsAuthenticatedUrl = () => {
  const { domain, pathPrefix, isAuthenticatedPath } = config
  return `${ domain }${ pathPrefix }${ isAuthenticatedPath }`
}

export const getAuthUrl = () => {
  const { domain, pathPrefix, authPath } = config
  return `${ domain }${ pathPrefix }${ authPath }`
}

export const getAuthOIDCUrl = () => {
  const { domain, pathPrefix, authOIDCPath } = config
  return `${ domain }${ pathPrefix }${ authOIDCPath }`
}

export const getOIDCProviderUrl = () => {
  // TODO: generate this dynamically using environment
  const authorizeUri = "https://auth.grip-on-it.com/v2/rjsfm52t/oidc/idp/authorize"
  const responseType = "code"
  const scope = "openid"
  const clientId = "d3d664c7-bb33-4bf0-b7c9-b8bdf1199b76"

  // @TODO: add production url
  // @TODO: extract protocol, domain
  // @TODO: use to() for paths
  const redirectUri = hostname === "acc.straatnotes.amsterdam.nl"
  ? "https://acc.straatnotes.amsterdam.nl/looplijsten/authentication/callback"
  : "http://localhost:3000/authentication/callback"
  return `${ authorizeUri }?response_type=${ responseType }&scope=${ scope }&client_id=${ clientId }&redirect_uri=${ encodeURIComponent(redirectUri) }`
}

export const getBasepath = () => hostname === "acc.straatnotes.amsterdam.nl" || hostname === "straatnotes.amsterdam.nl" ? "/looplijsten" : ""
export const to = (path: string, appendParams = true) => {
  const forwardParams = ["api", "anonymous"]
  const params = parseLocationSearch(window.location.search)
  const queryParamsString = queryParams(pick(params, forwardParams))
  return `${ getBasepath() }${ path[0] !== "/" ? "/" : "" }${ path }${ appendParams ? queryParamsString : "" }`
}
