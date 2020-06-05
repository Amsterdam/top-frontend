import React, { FC, useCallback } from "react"
import { Form } from "react-final-form"
import _difference from "lodash/difference"
import { Button, Heading } from "@datapunt/asc-ui"
import useGlobalState from "../../../hooks/useGlobalState"
import useGlobalActions from "../../../hooks/useGlobalActions"
import Box from "../../atoms/Box/Box"
import { LabelDiv, NumberField, ComplexSelectField, ComplexRadioFields, isRequired } from "amsterdam-react-final-form"
import { StartAddressField } from "../add-start-address/StartAddressField"
import { useLoggedInUser } from "../../../state/useLoggedInUser"
import { getDayPartOptions } from "./util/getDayPartOptions"

export type GenerateItineraryFormValues = {
  projects: Projects
  openingsDate: string
  postalCodeRange: API.PlannerPostalCodeSettings
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
    settings: {
      data
    },
    users: {
      results: users
    }
  } = useGlobalState()

  console.log(data)

  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(
    (values: GenerateItineraryFormValues) => create(values, values.users.includes(loggedInUser!)),
    [create, loggedInUser]
  )

  if (!data) {
    return null
  }

  const dayPartOptions = getDayPartOptions(data)

  return (
    <Form
      keepDirtyOnReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        openingsDate: data?.opening_date,
        projects: data?.projects,
        postalCodeRange: data?.postal_code,
        numAddresses: 8,
        dayPart: dayPartOptions[0],
        users: [loggedInUser!]
      }}
      render={({ handleSubmit, values, hasValidationErrors, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Box pb={4} pt={4}>
            <Heading>Genereer je looplijst</Heading>
          </Box>
          <LabelDiv>Wie zitten er vandaag in je team?</LabelDiv>
          <ComplexSelectField
            label='Toezichthouder 1'
            name='users[0]'
            optionLabelField='full_name'
            withEmptyOption={true}
            options={_difference(users!, _difference(values.users, [values.users?.[0]]))}
            validate={isRequired()}
          />
          <ComplexSelectField
            label='Toezichthouder 2'
            name='users[1]'
            optionLabelField='full_name'
            withEmptyOption={true}
            options={_difference(users!, _difference(values.users, [values.users?.[1]]))}
            validate={isRequired()}
          />
          <ComplexSelectField
              label='Handhaver'
              name='users[2]'
              optionLabelField='full_name'
              withEmptyOption={true}
              options={_difference(users!, _difference(values.users, [values.users?.[2]]))}
              validate={isRequired()}
          />
          <ComplexRadioFields
            label='Wat voor looplijst wil je maken?'
            name='dayPart'
            optionLabelField='label'
            options={dayPartOptions}
          />
          <NumberField
            label='Hoeveel adressen wil je in je looplijst? (Max. 20)'
            min={1}
            max={20}
            step={1}
            name='numAddresses'
            validate={isRequired()}
          />
          <StartAddressField name='startAddress' />
          <Box hAlign='flex-end'>
            <Button type="submit" variant="secondary" disabled={pristine || submitting || hasValidationErrors || data === undefined}>
              Genereer looplijst
            </Button>
          </Box>
        </form>
      )}
    />
  )
}

export default Generate
