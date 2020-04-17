import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { color } from "@datapunt/asc-ui"

type MenuItem = {
  to: string
  text: string | ReactNode
  isActive: boolean
}

type Props = {
  menuItems: MenuItem[]
}

const NavWrap = styled.div`
  position: fixed;
  width: 100%;
  top: 50px;
  left: 0;
  z-index: 99;
`

const Nav = styled.nav`
  background-color: ${ color("tint", "level3") };
  padding: 15px;
  padding-bottom: 0;
  margin-bottom: 15px;
`
const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`
const UlSpaced = styled(Ul)`
  li:last-child {
    margin-left: auto;
  }
`
const Li = styled.li`
  border-bottom: 5px solid transparent;
  border-bottom-color: ${ (props: { isActive?: boolean }) => props.isActive ? color("secondary") : 'transparent' };
  a {
    color: ${ color("tint", "level7") };
    text-decoration: none;
    font-weight: bold;
    display: block;
    margin: 0;
    padding: 0 10px;
  }
`

// this empty element is used to correct scroll position under fixed header, navigation
const FocusSpacer = styled.div`
  height: 116px;
`

const NavigationWrap: FC<Props> = ({ menuItems }) => {
  const UlComponent = menuItems.length > 1 ? UlSpaced : Ul

  return (
    <>
      <NavWrap>
        <Nav>
          <UlComponent>
            { menuItems.map(({ to, text, isActive }) => <Li key={ to } isActive={ isActive }><Link to={ to }>{ text }</Link></Li>) }
          </UlComponent>
        </Nav>
      </NavWrap>
      <FocusSpacer />
    </>
  )
}

export default NavigationWrap
