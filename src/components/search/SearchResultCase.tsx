import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import SearchResultDistance from "./SearchResultDistance"

type Props = {
  reason: string
  stadium: Stadium
  distance?: number
}

const Div = styled.div``
const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultCase: FC<Props> = ({ reason, stadium, distance }) => {
  const showDistance = distance !== undefined
  return (
    <Div className="SearchResultCase">
      <P>{ reason }</P>
      <Signal text={ stadium } />
      { showDistance &&
        <SearchResultDistance distance={ distance! } />
      }
    </Div>
  )
}
export default SearchResultCase
