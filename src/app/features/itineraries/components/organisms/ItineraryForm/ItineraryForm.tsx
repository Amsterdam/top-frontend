import React, { FC, useCallback } from "react"
import { navigate } from "@reach/router"
import {ScaffoldForm} from "amsterdam-react-final-form"

import {useItineraries, useSettings, useUsers} from "app/state/rest"
import {useLoggedInUser} from "app/state/rest/custom/useLoggedInUser"

import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to";

import {getDayPartOptions} from "./getDayPartOptions";
import {generateItineraryFormDefinition} from "./formDefinition";
import {mapPostValues} from "./mapPostValues";

const ItineraryForm: FC = () => {
  const { data: users } = useUsers()
  const { data: settings } = useSettings()
  const { execPost } = useItineraries({ lazy: true })
  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(async (values) => {
      // @ts-ignore
      await execPost(mapPostValues(values))
      await navigate(to("/"))
  }, [execPost])

  if (!users || !settings) {
    return null
  }

  const dayPartOptions = getDayPartOptions(settings)
  const fields = generateItineraryFormDefinition(users.results, dayPartOptions)

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        openingsDate: settings?.opening_date,
        projects: settings?.projects,
        postalCodeRange: settings?.postal_codes,
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
