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
  const displayKm = distance >= 1000
  const value = displayKm ? (distance / 1000).toFixed(2) : Math.round(distance)
  const unit = displayKm ? "km" : "m"
  return <P>{ value } { unit }</P>
}


export default SearchResultDistance
