import React, { FC, useCallback } from "react"
import { navigate } from "@reach/router"
import { ScaffoldForm } from "amsterdam-react-final-form"

import { useItineraries, useUsers } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to"

import { getDayPartOptions } from "./getDayPartOptions"
import { generateItineraryFormDefinition } from "./formDefinition"
import { mapPostValues } from "./mapPostValues"

type Props = {
  teamSettings: Components.Schemas.TeamSettings
}

const ItineraryForm: FC<Props> = ({ teamSettings }) => {
  const { data: users } = useUsers()
  const { execPost } = useItineraries({ lazy: true })
  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(async (values) => {
      // @ts-ignore
      await execPost(mapPostValues(values))
      await navigate(to("/"))
  }, [execPost])
    
  if (!users) {
    return null
  }
  // @ts-ignore
  if (loggedInUser?.team_settings.length > 0 && teamSettings.length > 0){
    teamSettings = teamSettings.filter((cur) => 
    cur.id === loggedInUser?.team_settings[0].id
    )
  }
  const team_settings = teamSettings[0]



  const dayPartOptions = getDayPartOptions(teamSettings.settings as Components.Schemas.PlannerSettings)
  const fields = generateItineraryFormDefinition(users.results, dayPartOptions)

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        teamSettings,
        openingsDate: teamSettings.settings?.opening_date,
        projects: teamSettings.settings?.projects,
        postalCodeRange: teamSettings.settings?.postal_codes,
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
