import React, { FC, useEffect } from "react"
import authToken from "../../lib/authToken"
import useGlobalState from "../../hooks/useGlobalState"

const AuthSession: FC = () => {

  const interval = 10 * 1000

  const {
    auth: { token },
    clear
  } = useGlobalState()

  useEffect(() => {
    if (token === undefined) return
    const { exp } = authToken.decode(token)
    window.setInterval(() => {
      if (Date.now() > exp * 1000) clear()
    }, interval)
  }, [token])
  return null
}

export default AuthSession
