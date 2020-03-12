import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import SearchResultDistance from "./SearchResultDistance"

type Props = {
  reason: string
  stadium: Stadium
  distance?: number
  teams?: string[]
}

const Div = styled.div``
const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultCase: FC<Props> = ({ reason, stadium, distance, teams }) => {

  const showDistance = distance !== undefined
  const showTeam = teams !== undefined
  const team = teams !== undefined && teams[0] !== undefined ? teams[0] : ""

  return (
    <Div className="SearchResultCase">
      <P>{ reason }</P>
      <Signal text={ stadium } />
      { showDistance &&
        <SearchResultDistance distance={ distance! } />
      }
      { showTeam &&
        <P>{ team }</P>
      }
    </Div>
  )
}
export default SearchResultCase
