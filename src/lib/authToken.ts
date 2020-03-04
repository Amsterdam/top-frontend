import jwtDecode from "jwt-decode"

const key = "top-authtoken"
// A regular expression that detects a valid JWT token
const regExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

const get = () : OAuthToken => {
  try {
    return localStorage.getItem(key) || undefined
  } catch (err) {
    console.error(err)
    return undefined
  }
}

const set = (token: AuthToken) : boolean => {
  if (regExp.test(token) === false) return false
  try {
    localStorage.setItem(key, token)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

const clear = () : boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

const decode = (token: AuthToken) : DecodedAuthToken => {
  const decodedToken = jwtDecode(token) as DecodedAuthToken
  decodedToken.exp = decodedToken.exp * 1000
  return decodedToken
}

export default { get, set, clear, decode }
