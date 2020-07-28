import React, { FC } from "react"
import { Router } from "@reach/router"
import { ThemeProvider } from "@datapunt/asc-ui"
import StateProvider from "./components/providers/StateProvider/StateProvider"
import styled from "styled-components"
import { basepath } from "./config/page"
import Anonymous from "./components/global/Anonymous"
import HeaderWrap from "./components/global/HeaderWrap"
import ItinerariesPage from "./pages/ItinerariesPage"
import LoginPage from "./pages/LoginPage"
import LoginCallbackPage from "./pages/LoginCallbackPage"
import SearchPage from "./pages/SearchPage"
import CasePage from "./pages/CasePage"
import NotePage from "./pages/NotePage"
import SuggestionsPage from "./pages/SuggestionsPage"
import IssuesPage from "./pages/IssuesPage"
import SettingsPage from "./pages/SettingsPage"
import NotFoundPage from "./pages/NotFoundPage"
import PageOverlay from "./components/global/PageOverlay"
import AuthSession from "./components/auth/AuthSession"
import { GlobalStyle } from "@datapunt/asc-ui"
import GlobalStyleIE11 from "./components/styled/IE11"
import NoteWizardProvider from "./components/notes/wizard/NoteWizardProvider"

const Main = styled.main`
  margin: 15px;
  margin-top: 0;
`

const App: FC = () => (
  <StateProvider>
    <NoteWizardProvider>
      <ThemeProvider>


        <GlobalStyle />
        <GlobalStyleIE11 />

        <Anonymous />

        <div className="App">
          <HeaderWrap />
          <PageOverlay />
          <AuthSession />
          <Main>
            <Router basepath={ basepath }>
              <LoginPage path="/login" />
              <LoginCallbackPage path="/authentication/callback" />
              <ItinerariesPage path="/" />
              <ItinerariesPage path="/itineraries/:id" />
              <SuggestionsPage path="/suggesties/:id" />
              <IssuesPage path="/issuemeldingen" />
              <SearchPage path="/zoeken" />
              <CasePage path="/cases/:caseId" />
              <NotePage path="/notes/:itineraryItemId" />
              <NotePage path="/notes/:itineraryItemId/:id" />
              <SettingsPage path="/settings" />
              <NotFoundPage default />
            </Router>
          </Main>
          {/*
            Modals are teleported to this div using React' portals
            @see https://reactjs.org/docs/portals.html
          */}
          <div id='modal-root' />
        </div>
      </ThemeProvider>
    </NoteWizardProvider>
  </StateProvider>
)

export default App
