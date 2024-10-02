import { lazy } from "react"

const TeamSettingsListPage = lazy(() => import("./components/pages/TeamSettingsListPage"))
const TeamSettingsDaysPage = lazy(() => import("./components/pages/TeamSettingsDaysPage"))
const DaySettingsPage = lazy(() => import("./components/pages/DaySettingsPage"))
const CreateDaySettingsPage = lazy(() => import("./components/pages/CreateDaySettingsPage"))


const routes = {
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsDaysPage,
  "/team-settings/:teamSettingsId/:daySettingsId": DaySettingsPage,
  "/team-settings/:teamSettingsId/nieuw": CreateDaySettingsPage
}

export default routes
