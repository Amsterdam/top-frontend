import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  distance: Distance
}

const P = styled.p`
  margin: 0
  padding: 0 6px
  font-weight: normal
  color: black
  white-space: nowrap
`

const SearchResultDistance: FC<Props> = ({ distance }) => {
  const displayKm = distance >= 1000
  const value = displayKm ? (distance / 1000).toFixed(2) : Math.round(distance)
  const unit = displayKm ? "km" : "m"
  return <P>{ value } { unit }</P>
}


export default SearchResultDistance
