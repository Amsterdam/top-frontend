import React, { ComponentType, useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { useIsAuthorized } from "app/state/rest/"
import { hasToken } from "app/state/auth/tokenStore"

import to from "../to"

type Props = {
  page: ComponentType
} & RouteComponentProps

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedRoute: React.FC<Props> = ({ page: Page, ...restProps }) => {
  const { data } = useIsAuthorized()
  
  // useEffect(() => {
  //   if (!token) {
  //     navigate(to("/login"))
  //   }
  // }, [token, data])

  return !data?.is_authorized
    ? <Page {...restProps} />
    : null
}

export default ProtectedRoute
