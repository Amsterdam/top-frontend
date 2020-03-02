import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Search from "../components/search/Search"
import Navigation from "../components/global/Navigation"

type Props = RouteComponentProps

const SearchPage: FC<Props> = () => {

  return (
    <>
      <Navigation />
      <Search />
    </>
  )
}

export default SearchPage
