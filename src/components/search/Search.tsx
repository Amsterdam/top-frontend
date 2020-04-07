import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults, {ActionButtonsComponentType, To} from "./SearchResults"
import SmallSpinner from "../global/SmallSpinner"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  to?:To
  actionButtonsComponent?:ActionButtonsComponentType
}

const Search: FC<Props> = ({ actionButtonsComponent, to }) => {
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
      <SearchResults
        to={to}
        results={ results }
        actionButtonsComponent={actionButtonsComponent}
      />
    </div>
  )
}
export default Search
