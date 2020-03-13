import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Spinner } from "@datapunt/asc-ui"
import useGlobalState from "../../hooks/useGlobalState"

const Search: FC = () => {

  const {
    search: {
      isFetching,
      results
    }
  } = useGlobalState()

  const showSpinner = isFetching

  return (
    <div className="Search">
      <SearchForm />
      { showSpinner &&
        <Spinner size={ 40 } />
      }
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
