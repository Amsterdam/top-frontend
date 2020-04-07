const trimTrailingSlash = (str: string) => str.replace(/\/$/, "")

export const basepath = "/"

export const to = (path: string = "") => `${ basepath }${ path }`

export const isPage = (page: string) => trimTrailingSlash(window.location.pathname) === trimTrailingSlash(to(page))
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
