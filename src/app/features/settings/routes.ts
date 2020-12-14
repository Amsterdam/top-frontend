import TeamSettingsListPage from "./components/pages/TeamSettingsListPage"
import TeamSettingsDaysPage from "./components/pages/TeamSettingsDaysPage"
import DaySettingsPage from "./components/pages/DaySettingsPage"

const routes = {
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsDaysPage,
  "/team-settings/:teamSettingsId/:daySettingsId": DaySettingsPage
}

export default routes
