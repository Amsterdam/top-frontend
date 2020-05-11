import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults, { ActionButtonsComponentType, CaseTo } from "./SearchResults"
import SmallSpinner from "../global/SmallSpinner"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  caseTo?: CaseTo
  actionButtonsComponent?: ActionButtonsComponentType
}

const Search: FC<Props> = ({ actionButtonsComponent, caseTo }) => {
  const {
    search: {
      results
    }
  } = useGlobalState()

  return (
    <div className="Search">
      <SearchForm />
      <SearchResults
        caseTo={caseTo}
        results={ results }
        actionButtonsComponent={actionButtonsComponent}
      />
    </div>
  )
}
export default Search
