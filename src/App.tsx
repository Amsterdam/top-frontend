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
import SettingsPage from "./pages/SettingsPage"
import NotFoundPage from "./pages/NotFoundPage"
import PageOverlay from "./components/global/PageOverlay"
import AuthSession from "./components/auth/AuthSession"

const Main = styled.main`
  margin: 15px
  margin-top: 0
`

const App: FC = () => (
    <StateProvider>
      <ThemeProvider>
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
              <SearchPage path="/zoeken" />
              <CasePage path="/cases/:caseId" />
              <NotePage path="/notes/:itineraryId" />
              <NotePage path="/notes/:itineraryId/:id" />
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
    </StateProvider>
  )

export default App
