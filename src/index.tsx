import React from "react"
import ReactDOM from "react-dom"
import { AuthProvider } from "react-oidc-context"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { env } from "app/config/env"
import { oidcConfig } from "app/state/auth/oidc/oidcConfig"
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui"


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig} >
      <ThemeProvider>
      <GlobalStyle />
      <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

console.log("Commit hash:", env.REACT_APP_GIT_COMMIT_HASH ?? "n/a")
