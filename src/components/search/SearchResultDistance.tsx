import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  distance: Distance
}

const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultDistance: FC<Props> = ({ distance }) => {
  const km = (distance / 1000).toPrecision(2)
  return <P>{ km } km</P>
}


export default SearchResultDistance
