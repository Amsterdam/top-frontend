import { lazy } from "react"

const AuthPage = lazy(() => import("./components/pages/login/AuthPage"))

const routes = {
  "/auth": AuthPage
}

export default routes
