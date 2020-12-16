const tokenKey = "top-authtoken"
const userKey = "top-authuser"

export const getUserId = () => localStorage.getItem(userKey)
export const getToken = () => localStorage.getItem(tokenKey)
export const hasToken = () => localStorage.getItem(tokenKey) !== null

export const setUser = (id: string, token: string) => {
  localStorage.setItem(userKey, id)
  localStorage.setItem(tokenKey, token)
}


export const clearToken = () => {
  localStorage.removeItem(userKey)
  localStorage.removeItem(tokenKey)
}

