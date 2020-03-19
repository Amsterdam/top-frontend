import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import SmallSpinner from "../global/SmallSpinner"
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
        <SmallSpinner />
      }
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
