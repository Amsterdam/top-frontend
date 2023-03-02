import type { KeycloakInitOptions } from "keycloak-js"

const options: KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: false
}

export default options
