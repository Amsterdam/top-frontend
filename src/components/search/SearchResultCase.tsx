import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  reason: string
  stadium: Stadium
  teams?: TeamMembers[]
}

const Div = styled.div``
const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultCase: FC<Props> = ({ reason, stadium, teams }) => {

  const {
    auth: {
      user: { email = "" } = {}
    }
  } = useGlobalState()

  const hasTeam = teams !== undefined && teams.length > 0
  const showTeam = hasTeam
  const firstTeam = hasTeam ? teams![0] : undefined
  const isOwnTeam = hasTeam && firstTeam!.map(({ user: { email } }) => email).includes(email)
  const teamString = hasTeam ? firstTeam!.map(({ user: { full_name } }) => full_name).join(", ") : ""
  const team = hasTeam ? (isOwnTeam ? "In mijn lijst" : `In lijst: ${ teamString }`) : ""

  return (
    <Div className="SearchResultCase">
      <P>{ reason }</P>
      <Signal text={ stadium } />
      { showTeam &&
        <P>{ team }</P>
      }
    </Div>
  )
}
export default SearchResultCase
