import React, { ComponentType, useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { hasToken } from "app/state/auth/tokenStore"

import to from "../to"

type Props = {
  page: ComponentType
} & RouteComponentProps

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedRoute: React.FC<Props> = ({ page: Page, ...restProps }) => {
  const { token } = useKeycloak()
  
  // useEffect(() => {
  //   if (!token) {
  //     navigate(to("/login"))
  //   }
  // }, [token, data])

  return token
    ? <Page {...restProps} />
    : null
}

export default ProtectedRoute
