import {setQueryParams} from "../lib/utils/setQueryParams"
import {deleteQueryParam} from "../lib/utils/deleteQueryParam"

const trimTrailingSlash = (str: string) => str.replace(/\/$/, "")
const stripDoubleSlashes = (str: string) => str.replace(/(\/\/)/g, "/")

export const basepath = "/"

export const to = (path: string = "") =>
  stripDoubleSlashes(`${ basepath }${ path }`)

type StringMap = {[key:string]:string}
export const toMergeQueryString = (params:StringMap) =>
  to(`${window.location.pathname}${setQueryParams(window.location.search, params)}`)

export const toDeleteQueryStringParams = (params:string[]) =>
  to(deleteQueryParam(window.location.search, params))

export const isPage = (page: string) => trimTrailingSlash(window.location.pathname) === trimTrailingSlash(to(page))
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
