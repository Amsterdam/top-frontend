import CreateItineraryPage from "./components/pages/create/CreateItineraryPage"
import HomePage from "app/features/shared/components/pages/HomePage"
import ItineraryPage from "./components/pages/itinerary/ItineraryPage"
import ListItinerariesPage from "./components/pages/list/ListItinerariesPage"
import ListTeamSettingsOptionsPage from "./components/pages/list/ListTeamSettingsOptionsPage"
import SearchPage from "./components/pages/search/SearchPage"
import SuggestionsPage from "./components/pages/suggestions/SuggestionsPage"

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
