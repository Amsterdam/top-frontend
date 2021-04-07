import TeamSettingsListPage from "./components/pages/TeamSettingsListPage"
import TeamSettingsDaysPage from "./components/pages/TeamSettingsDaysPage"
import DaySettingsPage from "./components/pages/DaySettingsPage"
import CreateDaySettingsPage from "./components/pages/CreateDaySettingsPage"

const routes = {
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsDaysPage,
  "/team-settings/:teamSettingsId/:daySettingsId": DaySettingsPage,
  "/team-settings/:teamSettingsId/nieuw": CreateDaySettingsPage
}

export default routes
