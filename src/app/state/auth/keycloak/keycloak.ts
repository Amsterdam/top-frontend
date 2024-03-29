import settings from "./settings"
import Keycloak from "keycloak-js"
import keycloakMock from "./keycloak.mock"


export const keycloak = process.env.NODE_ENV !== "test" ? new Keycloak(settings) : keycloakMock

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
