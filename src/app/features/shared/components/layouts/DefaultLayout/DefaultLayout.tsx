import React from "react"
import styled from "styled-components"

import { Button, Header, themeColor } from "@amsterdam/asc-ui"
import { Logout } from "@amsterdam/asc-assets"
import { Link } from "@reach/router"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import ErrorDisplay from "../../organisms/ErrorDisplay/ErrorDisplay"
import Navigation from "../../organisms/Navigation/Navigation"

const envs = {
  acceptance: "ACC",
  development: "DEV",
  production: undefined,
  test: "TST"
}

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
          title={ [ "Toezicht op pad", envs[process.env.NODE_ENV] ].join(" ") }
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
      <Spacing p={ 4 }>
        { children }
      </Spacing>
    </>
  )
}

export default DefaultLayout
