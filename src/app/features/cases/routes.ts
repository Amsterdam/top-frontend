import { lazy } from "react"

const CaseDetailPage = lazy(() => import("./components/pages/CaseDetailPage/CaseDetailPage"))

const routes = {
  "/cases/:id": CaseDetailPage
}

export default routes
