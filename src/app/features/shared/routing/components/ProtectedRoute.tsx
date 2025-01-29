import React, { ComponentType } from "react"
import { useAuth } from "react-oidc-context"

type Props = {
  page: ComponentType
}

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedRoute: React.FC<Props> = ({ page: Page, ...restProps }) => {
  const auth = useAuth()
  const token = auth.user?.access_token

  return token
    ? <Page { ...restProps } />
    : null
}

export default ProtectedRoute
