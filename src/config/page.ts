const trimTrailingSlash = (str: string) => str.replace(/\/$/, "")
const stripDoubleSlashes = (str: string) => str.replace(/(\/\/)/g, "/")

export const basepath = "/"

export const to = (path: string = "") =>
  stripDoubleSlashes(`${ basepath }${ path }`)

export const isPage = (page: string) => trimTrailingSlash(window.location.pathname) === trimTrailingSlash(to(page))
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
