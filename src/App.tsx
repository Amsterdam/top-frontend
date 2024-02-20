import React from "react"
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"
import Router from "./app/features/shared/routing/Router"
import ApiProvider from "./app/state/rest/provider/ApiProvider"
import KeycloakProvider from "app/state/auth/keycloak/KeycloakProvider"
import initializedCallback from "app/state/auth/keycloak/initializedCallback"
import AnonymousProvider from "./app/state/anonymous/AnonymousProvider"
import Anonymous from "./app/state/anonymous/Anonymous"
import NoteWizardProvider from "./app/features/visits/components/organisms/NoteWizard/NoteWizardProvider"
import SearchFormProvider from "./app/features/shared/components/organisms/SearchForm/SearchFormProvider"
import ErrorProvider from "./app/state/error/ErrorProvider"

function App () {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <KeycloakProvider initializedCallback={ initializedCallback }>
        <BrowserRouter>
          <ErrorProvider>
            <ApiProvider>
              <AnonymousProvider>
                <NoteWizardProvider>
                  <SearchFormProvider>
                    <Anonymous />
                    <Router />
                    <div id="modal-root" />
                  </SearchFormProvider>
                </NoteWizardProvider>
              </AnonymousProvider>
            </ApiProvider>
          </ErrorProvider>
        </BrowserRouter>
      </KeycloakProvider>
    </ThemeProvider>
  )
}

export default App
