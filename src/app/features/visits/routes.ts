import CreateVisitPage from "./components/pages/CreateVisitPage/CreateVisitPage"
import EditVisitPage from "./components/pages/EditVisitPage/EditVisitPage";

export default {
  "/visit/:itineraryId/:caseId": CreateVisitPage,
  "/visit/:itineraryId/:caseId/:id": EditVisitPage
}
