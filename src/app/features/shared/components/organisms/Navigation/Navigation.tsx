import React, { FC } from "react"
import styled from "styled-components"
import { useLocation, useParams } from "@reach/router"
import { themeColor } from "@amsterdam/asc-ui"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import { applyRouteParams } from "app/features/shared/routing/to"
import ItineraryNavigationButton from "../../molecules/ItineraryNavigationButton/ItineraryNavigationButton"
import OpenIssuesNavigationButton from "../../molecules/OpenIssuesNavigationButton/OpenIssuesNavigationButton"
import SearchNavigationButton from "../../molecules/SearchNavigationButton/SearchNavigationButton"

const NavWrap = styled.div`
  position: fixed;
  width: 100%;
  top: 50px;
  left: 0;
  z-index: 99;
`

const Nav = styled.nav`
  background-color: ${ themeColor("tint", "level3") };
  padding: 15px 15px 0;
  margin-bottom: 15px;
`

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`

const Li = styled.li`
  border-bottom: 5px solid transparent;
  border-bottom-color: ${ (props: {isActive?: boolean}) => props.isActive ? themeColor("secondary") : "transparent" };
  min-height: 33px;

  a {
    color: ${ themeColor("tint", "level7") };
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    display: block;
    margin: 0;
    padding: 0 10px;
  }
`

const SpacedLi = styled(Li)`
  margin-left: auto;
`

// this empty element is used to correct scroll position under fixed header, navigation
const FocusSpacer = styled.div`
  height: 100px;
`

const Navigation: FC = () => {
  const { itineraryId } = useParams() ?? {}
  const { data: itinerary } = useItinerary(itineraryId)
  const { pathname } = useLocation()

  const showItineraryNavigationItems = (pathname.startsWith("/cases") || pathname.startsWith("/issuemeldingen") || (pathname.startsWith("/lijst") && itineraryId) || pathname.startsWith("/visits") || pathname.startsWith("/zoeken"))

  return (
    <>
      <NavWrap>
        <Nav>
          <Ul>
            { showItineraryNavigationItems &&
            <Li
              isActive={ pathname === "/" || pathname === ("/lijst") || pathname === applyRouteParams("/lijst/:itineraryId/", { itineraryId }) }>
              <ItineraryNavigationButton />
            </Li>
            }
            { showItineraryNavigationItems && itinerary && itinerary?.settings.team_settings.team_type.show_issuemelding &&
            <Li isActive={ pathname.startsWith("/issuemeldingen") }>
              <OpenIssuesNavigationButton itineraryId={ itineraryId } />
            </Li>
            }
            <SpacedLi isActive={ pathname.startsWith("/zoeken") }>
              <SearchNavigationButton itineraryId={ itineraryId } />
            </SpacedLi>
          </Ul>
        </Nav>
      </NavWrap>
      <FocusSpacer />
    </>
  )
}

export default Navigation
