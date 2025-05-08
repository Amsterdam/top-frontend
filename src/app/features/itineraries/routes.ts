import { lazy } from "react"
import HomePage from "app/features/shared/components/pages/HomePage"

const ItineraryPage = lazy(() => import("./components/pages/itinerary/ItineraryPage"))
const ListItinerariesPage = lazy(() => import("./components/pages/list/ListItinerariesPage"))
const ListTeamSettingsOptionsPage = lazy(() => import("./components/pages/list/ListTeamSettingsOptionsPage"))
const SearchPage = lazy(() => import("./components/pages/search/SearchPage"))
const SuggestionsPage = lazy(() => import("./components/pages/suggestions/SuggestionsPage"))
const CreateItineraryPage = lazy(() => import("./components/pages/create/CreateItineraryPage"))

const routes = {
  "/": HomePage,
  "/kies-looplijst": ListItinerariesPage,
  "/lijst-instellingen": ListTeamSettingsOptionsPage,
  "/lijst": ItineraryPage,
  "/lijst/:itineraryId": ItineraryPage,
  "/lijst/:itineraryId/suggesties": SuggestionsPage,
  "/lijst/:itineraryId/zoeken": SearchPage,
  "/lijst/nieuw": ListTeamSettingsOptionsPage,
  "/lijst/nieuw/:teamSettingsId": CreateItineraryPage,
  "/zoeken": SearchPage
}

export default routes
