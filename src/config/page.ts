export const basepath = "/"

export const to = (path: string = "") => {
  return `${ basepath }${ path }`
}

export const isPage = (page: string) => window.location.pathname === to(page)
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
