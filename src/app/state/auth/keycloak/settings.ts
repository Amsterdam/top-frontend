import { env } from "app/config/env"
const settings = {
  "realm": env.REACT_APP_KEYCLOAK_REALM || "",
  "clientId": env.REACT_APP_CLIENT_ID || "",
  "url": env.REACT_APP_AUTH_URL,
  "ssl-required": "external",
  "resource": env.REACT_APP_CLIENT_ID,
  "public-client": true,
  "confidential-port": 0
}

export default settings
