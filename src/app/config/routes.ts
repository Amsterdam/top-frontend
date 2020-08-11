import loginRoutes from "../features/login/routes"
import itinerariesRoutes from "../features/itineraries/routes"
import settingsRoutes from "../features/settings/routes"
import casesRoutes from "../features/cases/routes"
import visitsRoutes from "../features/visits/routes"

const routes = {
  // NOTE: add your own feature here for routing.
  ...loginRoutes,
  ...itinerariesRoutes,
  ...settingsRoutes,
  ...casesRoutes,
  ...visitsRoutes
}

export type Routes = typeof routes
export default routes
