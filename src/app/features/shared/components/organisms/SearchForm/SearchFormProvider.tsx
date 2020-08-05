import React, { createContext, useState } from "react"
import { FormValues } from "./SearchForm"

type Values = {
  values: FormValues|undefined
  setValues: (values: FormValues|undefined) => void
}

export const SearchFormContext = createContext<Values>({ values: undefined, setValues: () => undefined })

const SearchFormProvider: React.FC = ({ children }) => {
  const [ values, setValues ] = useState<FormValues|undefined>(undefined)
  return <SearchFormContext.Provider value={{ values, setValues }}>
    { children }
  </SearchFormContext.Provider>
}

export default SearchFormProvider
