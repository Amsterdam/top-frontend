import settings from "./settings"
import Keycloak from "keycloak-js"
import keycloakMock from "./keycloak.mock"

export const keycloak = process.env.NODE_ENV !== "test" ? new (Keycloak as any)(settings) : keycloakMock

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Keycloak = typeof keycloak

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
