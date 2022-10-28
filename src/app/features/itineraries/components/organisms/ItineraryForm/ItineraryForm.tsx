import React, { FC, useCallback } from "react"
import { Link, navigate } from "@reach/router"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Alert, Paragraph } from "@amsterdam/asc-ui"

import { useItineraries, useUsers } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to"

import { getDaySettingsOptions } from "app/features/itineraries/components/organisms/ItineraryForm/getDaySettingsOptions"
import { generateItineraryFormDefinition } from "./ItineraryFormDefinition"
import { mapPostValues } from "./mapPostValues"
import mapUsersToLabel from "app/features/itineraries/utils/mapUsersToLabel"

type Props = {
  teamSettings: Components.Schemas.TeamSettings
}

const ItineraryForm: FC<Props> = ({ teamSettings }) => {
  const { data: users } = useUsers()
  const loggedInUser = useLoggedInUser()
  const { execPost } = useItineraries({ lazy: true })

  const handleSubmit = useCallback(async (values) => {
    // @ts-ignore
    await execPost(mapPostValues(values))
    await navigate(to("/lijst"))
  }, [ execPost ])

  if (!users) {
    return null
  }

  const userOptions = mapUsersToLabel(users?.results)
  const daySettingsOptions = getDaySettingsOptions(teamSettings)
  const fields = generateItineraryFormDefinition(userOptions, daySettingsOptions)

  if (daySettingsOptions.length === 0) {
    return (
      <Alert level="info">
        <Paragraph>
          Dit team heeft nog geen daginstellingen voor vandaag!
          Vraag eerst aan je planner om die voor je aan te maken.
        </Paragraph>
        <Link to={ "/lijst" }>Terug naar het overzicht</Link>
      </Alert>
    )
  }

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={ true }
      onSubmit={ handleSubmit }
      initialValues={ {
        daySettings: daySettingsOptions[0],
        numAddresses: 8,
        teamSettings,
        team_members: [ loggedInUser ]
      } }
    >
      <Scaffold fields={ fields } />
    </ScaffoldForm>
  )
}

export default ItineraryForm
