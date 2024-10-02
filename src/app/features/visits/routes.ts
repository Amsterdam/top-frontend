import { lazy } from "react"

const CreateVisitPage = lazy(() => import("./components/pages/CreateVisitPage/CreateVisitPage"))
const EditVisitPage = lazy(() => import("./components/pages/EditVisitPage/EditVisitPage"))


const routes = {
  "/visit/:itineraryId/:caseId": CreateVisitPage,
  "/visit/:itineraryId/:caseId/:id": EditVisitPage
}

export default routes
