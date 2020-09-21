import React, { FC, useCallback } from "react"
import { navigate } from "@reach/router"
import { ScaffoldForm } from "amsterdam-react-final-form"

import { useItineraries, useSettings, useTeamSettingsList, useUsers } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to"

import { getDayPartOptions } from "./getDayPartOptions"
import { generateItineraryFormDefinition } from "./formDefinition"
import { mapPostValues } from "./mapPostValues"

const ItineraryForm: FC = () => {
  const { data: users } = useUsers()
  let { data: settings } = useSettings()
  let { data: teamSettings } = useTeamSettingsList()
  const { execPost } = useItineraries({ lazy: true })
  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(async (values) => {
      // @ts-ignore
      await execPost(mapPostValues(values))
      await navigate(to("/"))
  }, [execPost])
    
  if (!users || !settings || !teamSettings || teamSettings.length <= 0) {
    return null
  }
  // @ts-ignore
  if (loggedInUser?.team_settings.length > 0 && teamSettings.length > 0){
    teamSettings = teamSettings.filter((cur) => 
    cur.id === loggedInUser?.team_settings[0].id
    )
  }
  const team_settings = teamSettings[0]



  const dayPartOptions = getDayPartOptions(team_settings.settings)
  const fields = generateItineraryFormDefinition(users.results, dayPartOptions)

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        team_settings,
        openingsDate: team_settings.settings?.opening_date,
        projects: team_settings.settings?.projects,
        postalCodeRange: team_settings.settings?.postal_codes,
        numAddresses: 8,
        dayPart: dayPartOptions[0],
        team_members: [ loggedInUser ]
      }}
    >
      <Scaffold fields={fields} />
    </ScaffoldForm>
  )
}

export default ItineraryForm
