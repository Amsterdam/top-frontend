import React, { FC, useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import useGlobalState from "../../../hooks/useGlobalState"
import useGlobalActions from "../../../hooks/useGlobalActions"
import { useLoggedInUser } from "../../../state/useLoggedInUser"
import { getDayPartOptions } from "./util/getDayPartOptions"
import { generateItineraryFormDefinition } from "../form/itinerary/itineraryFormDefinition"
import Scaffold from "../../form/Scaffold"

export type GenerateItineraryFormValues = {
  openingsDate: string
  projects: Projects
  postalCodeRange: PostalCodeRange
  numAddresses: number
  dayPart: { label: string, settingsList?: API.PlannerListSettings }
  users: User[]
  startAddress?: CaseId
}

const Generate: FC = () => {
  const {
    itinerariesActions: {
      create
    }
  } = useGlobalActions()
  const {
    planningSettings: {
      data
    },
    users: {
      results: users
    }
  } = useGlobalState()

  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(
    (values: GenerateItineraryFormValues) => create(values, values.users.includes(loggedInUser!)),
    [create, loggedInUser]
  )

  if (!data) {
    return null
  }

  const dayPartOptions = getDayPartOptions(data.settings)
  const fields = generateItineraryFormDefinition(users!, dayPartOptions)

  return (
    <ScaffoldForm
      keepDirtyOnReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        openingsDate: data.settings.opening_date,
        projects: data.settings.projects,
        postalCodeRange: data.settings.postal_code,
        numAddresses: 8,
        dayPart: dayPartOptions[0],
        users: [loggedInUser!]
      }}
    >
      <Scaffold fields={fields} />
    </ScaffoldForm>
  )
}

export default Generate
