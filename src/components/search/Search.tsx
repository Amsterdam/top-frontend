import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Spinner } from "@datapunt/asc-ui"
import { to } from "../../config/page"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import TamTamLink from "../styled/TamTamLink"

const Div = styled.div`
  display: flex
  justify-content: flex-end
  a {
    position: relative
    top: -33px
    padding: 12px 15px
    margin-bottom: 0
  }
`

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
      <Div>
        <TamTamLink to={ to("parse") }>Copy+paste TamTam lijst</TamTamLink>
      </Div>
      { showSpinner &&
        <Spinner size={ 40 } />
      }
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
