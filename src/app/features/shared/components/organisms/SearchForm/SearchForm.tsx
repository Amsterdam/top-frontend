import React, { FC, useCallback, useContext, useMemo } from "react"
import styled from "styled-components"
import { Scaffold, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { ApiName } from "app/features/types"
import { createDefinition } from "./formDefinition"
import { SearchFormContext } from "./SearchFormProvider"
import { useParams } from "@reach/router"

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
  const { itineraryId } = useParams()
  const { values, setValues } = useContext(SearchFormContext)

  const handleSubmit = useCallback((values: FormValues) => {
    setValues(values)
    return Promise.resolve(true)
  }, [ setValues ])

  const scaffoldProps = useMemo(
    () => createDefinition(
      // @ts-ignore
      () => setValues({}),
      itineraryId
    ),
    [ itineraryId, setValues ]
  )

  return (
    <Container>
      <ScaffoldForm
        initialValues={ { apiName: "BWV", isApiNameKnown: !!itineraryId, ...values } }
        onSubmit={ handleSubmit }
      >
        <Scaffold { ...scaffoldProps } />
      </ScaffoldForm>
    </Container>
  )
}

export default SearchForm
