import React, {useContext } from "react"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import SearchForm from "app/features/shared/components/organisms/SearchForm/SearchForm"
import SearchResults from "app/features/itineraries/components/organisms/SearchResults/SearchResults"
import {SearchFormContext} from "app/features/shared/components/organisms/SearchForm/SearchFormProvider"

const SearchPage:React.FC = () => {
  const { values } = useContext(SearchFormContext)

  return (
    <DefaultLayout>
      <SearchForm />
      { values && Object.keys(values).length > 1 && <SearchResults {...values} /> }
    </DefaultLayout>
  )
}

export default SearchPage
