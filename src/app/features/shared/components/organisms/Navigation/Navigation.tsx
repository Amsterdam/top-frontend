import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { applyRouteParams } from "app/features/shared/routing/to"
import ItineraryNavigationButton from "../../molecules/ItineraryNavigationButton/ItineraryNavigationButton"
import SearchNavigationButton from "../../molecules/SearchNavigationButton/SearchNavigationButton"
import styles from "./Navigation.module.css"

const Navigation: React.FC = () => {
  const { itineraryId } = useParams() ?? {}
  const { pathname } = useLocation()

  const shouldShowItineraryNav =
    pathname.startsWith("/cases") ||
    pathname.startsWith("/issuemeldingen") ||
    (pathname.startsWith("/lijst") && itineraryId) ||
    pathname.startsWith("/visits") ||
    pathname.startsWith("/zoeken")

  // Determine if the current path should be active for the itinerary nav button
  const getItineraryNavClass = () =>
    pathname === "/" ||
    pathname === "/lijst" ||
    `${pathname}/` === applyRouteParams("/lijst/:itineraryId/", { itineraryId })
      ? styles.navItemActive 
      : ""

  const isSearchActive = pathname.startsWith("/zoeken")

  return (
    <>
      <div className={styles.navigationWrapper}>
        <nav className={styles.navigation }>
          <ul className={styles.navList}>
            {shouldShowItineraryNav && (
              <li className={`${styles.navItemLink} ${getItineraryNavClass()}`}>
                <ItineraryNavigationButton />
              </li>
            )}
            <li
              className={`${styles.navItemLink} ${styles.spacedNavItem} ${isSearchActive ? styles.navItemActive : ""}`}
            >
              <SearchNavigationButton itineraryId={itineraryId} />
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.focusSpacer} />
    </>
  )
}

export default Navigation
