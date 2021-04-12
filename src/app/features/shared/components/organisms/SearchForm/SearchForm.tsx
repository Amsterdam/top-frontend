import React, { FC, useCallback, useContext, useMemo } from "react"
import styled from "styled-components"
import { Scaffold, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { ApiName } from "app/features/types"
import { createDefinition } from "./formDefinition"
import { SearchFormContext } from "./SearchFormProvider"
import { useParams } from "@reach/router"
import { useItinerary } from "app/state/rest/custom/useItinerary"

export type FormValues = {
  postalCode: string
  streetName: string
  streetNumber: number
  suffix?: string
  apiName: ApiName
}

const Container = styled.div`
  max-width: 60rem;
`

const SearchForm: FC = () => {
  const { itineraryId, teamSettingsId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId)

  const teamSettings = itinerary?.settings.day_settings.team_settings
  const teamName = teamSettings?.zaken_team_name || ""
  const apiName = teamSettings?.use_zaken_backend ? "ZKS" : "BWV"
  const { values, setValues } = useContext(SearchFormContext)

  const handleSubmit = useCallback((values: FormValues) => {
    setValues(values)
    return Promise.resolve(true)
  }, [ setValues ])

  const scaffoldProps = useMemo(
    () => createDefinition(
      // @ts-ignore
      () => setValues({}),
      itineraryId,
      teamSettingsId
    ),
    [ itineraryId, teamSettingsId, setValues ]
  )

  return (
    <Container>
      <ScaffoldForm
        initialValues={ { apiName, teamName, teamSettingsId, ...values } }
        onSubmit={ handleSubmit }
      >
        <Scaffold { ...scaffoldProps } />
      </ScaffoldForm>
    </Container>
  )
}

export default SearchForm
