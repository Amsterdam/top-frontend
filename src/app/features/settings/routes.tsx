import SettingsPage from "./components/pages/SettingsPage"
import TeamSettingsListPage from "./components/pages/TeamSettingsListPage"
import TeamSettingsPage from "./components/pages/TeamSettingsPage"
import TeamSettingsDaysPage from "./components/pages/TeamSettingsDaysPage"
import DaySettingsPage from "./components/pages/DaySettingsPage"

export default {
  "/settings": SettingsPage,
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsPage,
  "/team-settings-days/:teamSettingsId": TeamSettingsDaysPage,
  "/team-settings/:teamSettingsId/:daySettingsId": DaySettingsPage
}
