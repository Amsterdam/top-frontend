import settings from "./settings"
import Keycloak from "keycloak-js"
import keycloakMock from "./keycloak.mock"
import { env } from "app/config/env"


export const keycloak = env.NODE_ENV !== "test" ? new Keycloak(settings) : keycloakMock

if (env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
