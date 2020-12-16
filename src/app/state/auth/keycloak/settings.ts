const settings = {
  "realm": process.env.REACT_APP_KEYCLOAK_REALM,
  "url": process.env.REACT_APP_AUTH_URL,
  "ssl-required": "external",
  "resource": process.env.REACT_APP_CLIENT_ID,
  "public-client": true,
  "confidential-port": 0,
  "clientId": process.env.REACT_APP_CLIENT_ID
}

export default settings
