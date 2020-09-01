import OpenIssuesPage from "./components/pages/open-issues/OpenIssuesPage"
import SearchPage from "./components/pages/search/SearchPage"
import SuggestionsPage from "./components/pages/suggestions/SuggestionsPage"
import ListItinerariesPage from "./components/pages/list/ListItinerariesPage"
import ItineraryPage from "./components/pages/itinerary/ItineraryPage"
import CreateItineraryPage from "./components/pages/create/CreateItineraryPage"

export default {
  "/": ListItinerariesPage,
  "/lijst/:itineraryId/": ItineraryPage,
  "/lijst/nieuw/": CreateItineraryPage,
  "/lijst/:itineraryId/issuemeldingen/": OpenIssuesPage,
  "/issuemeldingen/": OpenIssuesPage,
  "/lijst/:itineraryId/zoeken/": SearchPage,
  "/zoeken/": SearchPage,
  "/lijst/:itineraryId/suggesties/": SuggestionsPage
}
