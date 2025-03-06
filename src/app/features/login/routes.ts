import { lazy } from "react"

const AuthPage = lazy(() => import("./pages/AuthPage"))

const routes = {
  "/auth": AuthPage
}

export default routes
