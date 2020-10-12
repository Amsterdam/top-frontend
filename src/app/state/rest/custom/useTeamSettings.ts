import { Options, useTeamSettingsList } from "../index"
import { useMemo } from "react"

export const useTeamSettings = (teamSettingsId: number, options?: Options) => {
  const { data } = useTeamSettingsList()
  return useMemo(() => data?.results.find(_ => String(_.id) === String(teamSettingsId)), [ data, teamSettingsId ])
}
