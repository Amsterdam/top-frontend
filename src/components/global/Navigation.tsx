import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { Search as SearchIcon } from "@datapunt/asc-assets"
import { to } from "../../config/page"
import { isPage, isHomePage } from "../../config/page"
import useGlobalState from "../../hooks/useGlobalState"

const NavWrap = styled.div`
  position: fixed
  width: 100%
  top: 50px
  left: 0
  z-index: 99
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
  justify-content: space-between
`
const Li = styled.li`
  border-bottom: 5px solid transparent
  border-bottom-color: ${ (props: { isActive?: boolean }) => props.isActive ? 'red' : 'transparent' }
  padding: 0 10px 7px 10px;
  a {
    color: black
  }
`
const LiSearch = styled(Li)`
  width: 24px
  height: 24px
`

// this empty element is used to correct scroll position under fixed header, navigation
const FocusSpacer = styled.div`
  height: 116px
`

const Navigation: FC = () => {

  const {
    itineraries: {
      itineraries
    }
  } = useGlobalState()

  const numItineraries = itineraries ? itineraries.map(itinerary => itinerary.items).flat(1).length : 0
  const showCounter = numItineraries > 0

  const looplijstActive = isHomePage()
  const searchActive = isPage("zoeken") || isPage("parse")

  return (
    <>
      <NavWrap>
        <Nav>
          <Ul>
            <Li isActive={ looplijstActive }><Link to={ to() }>Mijn looplijst { showCounter && `(${ numItineraries })` }</Link></Li>
            <LiSearch isActive={ searchActive }><Link to={ to("zoeken") }><SearchIcon /></Link></LiSearch>
          </Ul>
        </Nav>
      </NavWrap>
      <FocusSpacer />
    </>
  )
}
export default Navigation
