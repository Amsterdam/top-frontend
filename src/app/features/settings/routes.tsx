import SettingsPage from "./components/pages/SettingsPage"
import TeamSettingsListPage from "./components/pages/TeamSettingsListPage"
import TeamSettingsDaysPage from "./components/pages/TeamSettingsDaysPage"
import DaySettingsPage from "./components/pages/DaySettingsPage"

export default {
  "/settings": SettingsPage,
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsDaysPage,
  "/team-settings/:teamSettingsId/:daySettingsId": DaySettingsPage
}
