const settings = {
  "realm": process.env.REACT_APP_KEYCLOAK_REALM || "",
  "clientId": process.env.REACT_APP_CLIENT_ID || "",
  "url": process.env.REACT_APP_AUTH_URL,
  "ssl-required": "external",
  "resource": process.env.REACT_APP_CLIENT_ID,
  "public-client": true,
  "confidential-port": 0
}

export default settings
