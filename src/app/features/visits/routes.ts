import CreateVisitPage from "./components/pages/CreateVisitPage/CreateVisitPage"
import EditVisitPage from "./components/pages/EditVisitPage/EditVisitPage"

const routes = {
  "/visit/:itineraryId/:caseId": CreateVisitPage,
  "/visit/:itineraryId/:caseId/:id": EditVisitPage
}

export default routes
