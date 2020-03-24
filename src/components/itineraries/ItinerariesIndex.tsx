import React, { FC } from "react"
import { to } from "../../config/page"
import { Link } from "@reach/router"
import H1 from "../styled/H1"
import TeamMembersDisplay from "./TeamMembersDisplay"

type Props = {
  itineraries: Itineraries
}

const ItinerariesIndex: FC<Props> = ({ itineraries }) => {
  return (
    <div>
      <H1>Looplijsten</H1>
      { itineraries.map(({ id, team_members }) =>
        <Link key={ id } to={ to(`itineraries/${ id }`) }>
          <TeamMembersDisplay teamMembers={ team_members } />
        </Link>
        )
      }
    </div>
  )
}
export default ItinerariesIndex
