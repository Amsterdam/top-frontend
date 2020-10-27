import { useEffect } from "react"
import { navigate } from "@reach/router"
import to from "app/features/shared/routing/to"

const SettingsPage = () => {
  // Redirect to /team-settings which supersedes /settings.
  // TODO Delete route and related code.
  useEffect(() => {
    navigate(to("/team-settings"))
  })

  return null
}

export default SettingsPage
