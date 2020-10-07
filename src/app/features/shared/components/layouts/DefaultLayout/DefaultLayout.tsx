import React from "react"
import { Header, Button, themeColor } from "@amsterdam/asc-ui"
import { Logout } from "@amsterdam/asc-assets"
import { Link } from "@reach/router"

import styled from "styled-components"

import to from "app/features/shared/routing/to"
import Navigation from "../../organisms/Navigation/Navigation"
import Spacing from "../../atoms/Spacing/Spacing"
import ErrorDisplay from "../../organisms/ErrorDisplay/ErrorDisplay"

const StyledLink = styled(Link)`
  color ${ themeColor("tint", "level6") };
  text-decoration: none;
  margin-right: 8px
`

const HeaderWrap = styled.div`
  position: fixed;
  background-color: ${ themeColor("tint", "white") };
  width:100%;
  z-index:500;
`

type Props = {

}

const DefaultLayout: React.FC<Props> = ({ children } ) => (<div>
  <HeaderWrap>
    <ErrorDisplay />
    <Header
      title="Toezicht op pad"
      homeLink={to("/")}
      fullWidth={true}
      navigation={
        <StyledLink to={to("/logout")}>
          <Button
            as="span"
            variant="blank"
            iconLeft={ <Logout /> }>Uitloggen
          </Button>
        </StyledLink>
      }
    />
  </HeaderWrap>
  <Navigation />
  <Spacing p={4}>
    { children }
  </Spacing>
</div>)

export default DefaultLayout
