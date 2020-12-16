import React, { FC, useCallback } from "react"
import { navigate } from "@reach/router"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { useItineraries, useUsers } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to"

import { getDaySettingsOptions } from "app/features/itineraries/components/organisms/ItineraryForm/getDaySettingsOptions"
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
    await navigate(to("/lijst"))
  }, [ execPost ])

  if (!users) {
    return null
  }

  const daySettingsOptions = getDaySettingsOptions(teamSettings)
  const fields = generateItineraryFormDefinition(users.results, daySettingsOptions)

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={ true }
      onSubmit={ handleSubmit }
      initialValues={ {
        teamSettings,
        numAddresses: 8,
        daySettings: daySettingsOptions[0],
        team_members: [ loggedInUser ]
      } }
    >
      <Scaffold fields={ fields } />
    </ScaffoldForm>
  )
}

export default ItineraryForm
