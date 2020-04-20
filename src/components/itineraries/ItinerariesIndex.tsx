import React, { FC } from "react"
import { to } from "../../config/page"
import { Link } from "@reach/router"
import TeamMembersDisplay from "./TeamMembersDisplay"

type Props = {
  itineraries: Itineraries
}

const ItinerariesIndex: FC<Props> = ({ itineraries }) =>
  <div>
    <h1>Looplijsten</h1>
    { itineraries.map(({ id, team_members }) =>
      <Link key={ id } to={ to(`itineraries/${ id }`) }>
        <TeamMembersDisplay teamMembers={ team_members } />
      </Link>
      )
    }
  </div>
export default ItinerariesIndex
