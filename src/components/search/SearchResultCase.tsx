import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import FraudProbability from "../global/FraudProbability"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  reason: string
  stadium: Stadium
  teams?: TeamMembers[]
  fraudProbability?: number
}

const P = styled.p`
  font-weight: normal
  color: black
`
const StyledFraudProbability = styled(FraudProbability)`
  margin-left: 12px
  font-weight: bold
  color: #B4B4B4
`
const SearchResultCase: FC<Props> = ({ reason, stadium, teams, fraudProbability }) => {
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

  const showFraudProbability = fraudProbability !== undefined

  return (
    <div>
      <P>{ reason }{ showFraudProbability && <StyledFraudProbability fraudProbability={ fraudProbability! } /> }</P>
      <Signal text={ stadium } />
      { showTeam &&
        <P>{ team }</P>
      }
    </div>
  )
}
export default SearchResultCase
