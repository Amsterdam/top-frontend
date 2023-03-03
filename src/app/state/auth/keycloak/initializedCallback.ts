import { navigate } from "@reach/router"
import Keycloak from "keycloak-js"
import to from "app/features/shared/routing/to"
import { makeGatewayUrl } from "app/state/rest/hooks/utils/utils"
import createAuthHeaders from "app/state/rest/hooks/utils/createAuthHeaders"

const initializedCallback = async (keycloak: Keycloak, isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return
  }

  const response = await fetch(makeGatewayUrl([ "is-authorized" ]), {
    headers: {
      ...createAuthHeaders(keycloak.token),
      "Content-Type": "application/json"
    }
  })

  const { is_authorized } = await response.json()

  if (is_authorized === false) {
    navigate(to("/auth"))
  }
}

export default initializedCallback
