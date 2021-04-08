import React, { FC, useCallback } from "react"
import { navigate } from "@reach/router"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Alert, Paragraph } from "@amsterdam/asc-ui"
import { Link } from "@reach/router"

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

  const daySettingsOptions = getDaySettingsOptions(teamSettings)
  const fields = generateItineraryFormDefinition(users.results, daySettingsOptions)

  if (daySettingsOptions.length === 0) {
    return (
      <Alert level="info">
      <Paragraph>
        Er zijn voor dit team nog geen actieve daginstellingen aangemaakt!
        Vraag je planner om deze voor je aan te maken.
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
