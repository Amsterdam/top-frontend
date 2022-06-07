import React, { FC, useCallback, useContext, useMemo } from "react"
import styled from "styled-components"
import { Scaffold, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { createDefinition } from "./SearchFormDefinition"
import { SearchFormContext } from "./SearchFormProvider"

export type FormValues = {
  postalCode: string
  streetName: string
  streetNumber: number
  suffix?: string
}

const Container = styled.div`
  max-width: 60rem;
`

const SearchForm: FC = () => {
  const { values, setValues } = useContext(SearchFormContext)

  const handleSubmit = useCallback((values: FormValues) => {
    setValues(values)
    return Promise.resolve(true)
  }, [ setValues ])

  const scaffoldProps = useMemo(
    () => createDefinition(
      // @ts-ignore
      () => setValues(undefined)
    ),
    [ setValues ]
  )

  return (
    <Container>
      <ScaffoldForm
        initialValues={ { ...values } }
        onSubmit={ handleSubmit }
      >
        <Scaffold { ...scaffoldProps } />
      </ScaffoldForm>
    </Container>
  )
}

export default SearchForm
