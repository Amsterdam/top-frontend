import React, { FC } from "react"
import styled from "styled-components"
import StadiumBadge from "../global/StadiumBadge"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  reason: string
  stadium: Stadium
  teams?: TeamMembers[]
  fraudProbability?: number
}

const P = styled.p`
  font-weight: normal;
  color: black;
  margin: 6px 0;
`

const SearchResultCase: FC<Props> = ({ reason, stadium, teams }) => {
  const {
    auth: {
      user: { email = "" } = {}
    },
    itineraries: {
      itineraries
    }
  } = useGlobalState()

  const hasTeam = teams !== undefined && teams.length > 0
  const showTeam = hasTeam
  const firstTeam = hasTeam ? teams![0] : undefined
  const isOwnTeam = hasTeam && firstTeam!.map(({ user: { email } }) => email).includes(email)
  const teamString = hasTeam ? firstTeam!.map(({ user: { full_name } }) => full_name).join(", ") : ""
  const hasSingleItinerary = itineraries !== undefined && itineraries.length === 1
  const team = hasTeam ?
    (isOwnTeam && hasSingleItinerary ? "In mijn lijst" : `In lijst: ${ teamString }`) :
    ""

  return (
    <div>
      <P>{ reason }</P>
      <StadiumBadge text={ stadium } />
      { showTeam &&
        <P>{ team }</P>
      }
    </div>
  )
}
export default SearchResultCase
