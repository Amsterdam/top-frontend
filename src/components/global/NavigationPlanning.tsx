import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { to } from "../../config/page"
import { isPage } from "../../config/page"

const NavWrap = styled.div`
  position: fixed
  width: 100%
  top: 50px
  left: 0
  z-index: 9999
`

const Nav = styled.nav`
  background-color: #E6E6E6
  padding: 15px
  padding-bottom: 0
  margin-bottom: 15px
  width: calc(100% - 30px);
`
const Ul = styled.ul`
  list-style: none
  margin: 0
  padding: 0
  display: flex
`
const Li = styled.li`
  border-bottom: 5px solid transparent
  border-bottom-color: ${ (props: { isActive?: boolean }) => props.isActive ? 'red' : 'transparent' }
  padding: 0 10px 7px 10px
  margin-right: 24px;
  a {
    color: black
  }
`

// this empty element is used to correct scroll position under fixed header, navigation
const FocusSpacer = styled.div`
  height: 116px
`

const NavigationPlanning: FC = () => {

  const generateActive = isPage("planning")
  const resultActive = isPage("planning/result")
  const settingsActive = isPage("settings")

  return (
    <>
      <NavWrap>
        <Nav>
          <Ul>
            <Li isActive={ generateActive }><Link to={ to("planning") }>Genereer looplijsten</Link></Li>
            <Li isActive={ resultActive }><Link to={ to("planning/result") }>Looplijsten</Link></Li>
            <Li isActive={ settingsActive }><Link to={ to("settings") }>Settings</Link></Li>
          </Ul>
        </Nav>
      </NavWrap>
      <FocusSpacer />
    </>
  )
}
export default NavigationPlanning
