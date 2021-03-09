import React from "react"
import styled from "styled-components"

import { Button, Header, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Logout } from "@amsterdam/asc-assets"
import { Link } from "@reach/router"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import to from "app/features/shared/routing/to"
import ErrorDisplay from "../../organisms/ErrorDisplay/ErrorDisplay"
import Navigation from "../../organisms/Navigation/Navigation"

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

const StyledLink = styled(Link)`
  color ${ themeColor("tint", "level6") };
  text-decoration: none;
  margin-right: 8px
`

type Props = {}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { logout } = useKeycloak()

  return (
    <>
      <HeaderWrap>
        <ErrorDisplay />
        <Header
          title={ [ "Toezicht op pad", process.env.REACT_APP_ENV_ABBR ].join(" ") }
          homeLink={ to("/") }
          fullWidth={ true }
          navigation={
            <StyledLink as="a" onClick={ logout }>
              <Button
                as="span"
                variant="blank"
                iconLeft={ <Logout /> }>Log uit
              </Button>
            </StyledLink>
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
