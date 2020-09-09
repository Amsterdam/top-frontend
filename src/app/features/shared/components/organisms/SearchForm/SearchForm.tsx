import React, { FC, useCallback, useContext, useMemo } from "react"
import { Scaffold, ScaffoldForm } from "amsterdam-react-final-form"
import { createDefinition } from "./formDefinition"
import { SearchFormContext } from "./SearchFormProvider"

export type FormValues = {
  postalCode: string
  streetNumber: number
  suffix?: string
}


const SearchForm: FC = () => {
  const { values, setValues } = useContext(SearchFormContext)

  const handleSubmit = useCallback((values: FormValues) => {
    setValues(values)
    return Promise.resolve(true)
  }, [ setValues ])

  const scaffoldProps = useMemo(() => createDefinition(() =>
    // @ts-ignore
    setValues({})),
    [setValues]
  )

  return (<ScaffoldForm onSubmit={handleSubmit} initialValues={values}>
    <Scaffold {...scaffoldProps} />
  </ScaffoldForm>
  )
}

export default SearchForm
