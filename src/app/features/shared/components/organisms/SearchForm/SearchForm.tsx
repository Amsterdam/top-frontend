import React, {FC, useCallback, useContext } from "react"
import {Scaffold, ScaffoldForm} from "amsterdam-react-final-form"
import {scaffoldProps} from "./formDefinition";
import {SearchFormContext} from "./SearchFormProvider";

export type FormValues = {
  postalCode: string
  streetNumber: number
  suffix?: string
}


const SearchForm: FC = () => {
  const { values, setValues } = useContext(SearchFormContext)

  const handleSubmit = useCallback((values:FormValues) => {
    setValues(values)
    return Promise.resolve(true)
  }, [ setValues ])

  const handleReset = useCallback(() => {
    // @ts-ignore
    setValues({})
  }, [ setValues ])

  return (<ScaffoldForm onSubmit={handleSubmit} onReset={handleReset} initialValues={values} keepDirtyOnReinitialize={true}>
    <Scaffold {...scaffoldProps} />
  </ScaffoldForm>
  )
}

export default SearchForm
