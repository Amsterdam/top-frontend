const key = "top-authuser"

const get = () : OAuthUser => {
  try {
    const userStringified = localStorage.getItem(key)
    if (userStringified == null) return
    const user = JSON.parse(userStringified)
    return user !== null ? user : undefined
  } catch (err) {
    console.error(err)
    return undefined
  }
}

const set = (user: AuthUser) => {
  try {
    localStorage.setItem(key, JSON.stringify(user))
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

const isAuthUser = (user: User) : boolean => {
  const authUser = get()
  if (authUser === undefined) return false
  return authUser?.email === user.email
}

export default { get, set, clear, isAuthUser }
