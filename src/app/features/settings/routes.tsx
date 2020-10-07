import SettingsPage from "./components/pages/SettingsPage"
import TeamSettingsListPage from "./components/pages/TeamSettingsListPage"
import TeamSettingsPage from "./components/pages/TeamSettingsPage"

export default {
  "/settings": SettingsPage,
  "/team-settings": TeamSettingsListPage,
  "/team-settings/:teamSettingsId": TeamSettingsPage
}
