import React from "react"
import styled from "styled-components"

import { Button, Header, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Logout } from "@amsterdam/asc-assets"
import { Link } from "react-router-dom"

import to from "app/features/shared/routing/to"
import ErrorDisplay from "../../organisms/ErrorDisplay/ErrorDisplay"
import Navigation from "../../organisms/Navigation/Navigation"
import { env } from "app/config/env"
import { useAuth } from "react-oidc-context"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: calc(100vh - 100px);
  padding: ${ themeSpacing(4) };;
`

const HeaderWrap = styled.div`
  position: fixed;
  background-color: ${ themeColor("tint", "white") };
  width: 100%;
  z-index: 500;
`

type Props = {}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const auth = useAuth()

  return (
    <>
      <HeaderWrap>
        <ErrorDisplay />
        <Header
          title={`${ env.VITE_APP_TITLE ?? "Toezicht op pad" } ${ env.VITE_APP_ENV_SHORT }`}
          homeLink={ to("/") }
          fullWidth={ true }
          navigation={
            <Button
              onClick={ auth.signoutRedirect }
              as="span"
              variant="blank"
              iconLeft={ <Logout /> }
              style={{ marginRight: 8 }}
            >
              Uitloggen
            </Button>
          }
        />
      </HeaderWrap>
      <Navigation />
      <Main>
        { children }
      </Main>
    </>
  )
}

export default DefaultLayout
