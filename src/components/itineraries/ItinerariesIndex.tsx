import React, { FC } from "react"
import styled from "styled-components"
import { to } from "../../config/page"
import { Link } from "@reach/router"
import H1 from "../styled/H1"
import TeamMembersDisplay from "./TeamMembersDisplay"

type Props = {
  itineraries: Itineraries
}

const Div = styled.div`
  border-bottom: 1px solid #B4B4B4
  margin-bottom: 48px
`

const ItinerariesIndex: FC<Props> = ({ itineraries }) => {
  return (
    <Div>
      <H1>Andere looplijsten</H1>
      { itineraries.map(({ id, team_members }) =>
        <Link key={ id } to={ to(`itineraries/${ id }`) }>
          <TeamMembersDisplay teamMembers={ team_members } />
        </Link>
        )
      }
    </Div>
  )
}
export default ItinerariesIndex
