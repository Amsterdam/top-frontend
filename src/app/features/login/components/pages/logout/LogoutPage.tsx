import React, { useEffect } from "react"
import { navigate } from "@reach/router"

import to from "app/features/shared/routing/to"
import { clearToken } from "app/state/auth/tokenStore"

const LogoutPage: React.FC = () => {
  useEffect(() => {
    (async () => {
      clearToken()

      try {
        await fetch(process.env.REACT_APP_AUTH_LOGOUT_URL!, { mode: "no-cors", credentials: "include" })
      } finally {
        await navigate(to("/login"))
      }
    })()
  }, [])

  return null
}

export default LogoutPage
