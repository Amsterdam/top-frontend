import React from "react"

import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { LocationProvider } from "@reach/router"
import AuthSession from "./app/state/auth/AuthSession"
import Router from "./app/features/shared/routing/Router"
import ApiProvider from "./app/state/rest/provider/ApiProvider"
import AnonymousProvider from "./app/state/anonymous/AnonymousProvider"
import Anonymous from "./app/state/anonymous/Anonymous"
import NoteWizardProvider from "./app/features/visits/components/organisms/NoteWizard/NoteWizardProvider"
import SearchFormProvider from "./app/features/shared/components/organisms/SearchForm/SearchFormProvider"
import ErrorProvider from "./app/state/error/ErrorProvider"

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <ErrorProvider>
        <ApiProvider>
          <LocationProvider>
            <AnonymousProvider>
              <NoteWizardProvider>
                <SearchFormProvider>
                  <Anonymous />
                  <AuthSession />
                  <Router />
                  {/*
                    Modals are teleported to this div using React' portals
                    @see https://reactjs.org/docs/portals.html
                  */}
                  <div id='modal-root' />
                </SearchFormProvider>
              </NoteWizardProvider>
            </AnonymousProvider>
          </LocationProvider>
        </ApiProvider>
      </ErrorProvider>
    </ThemeProvider>
  )
}

export default App
