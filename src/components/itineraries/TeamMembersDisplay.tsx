import React, { FC } from "react"

type Props = {
  teamMembers: TeamMembers
}

const TeamMembersDisplay: FC<Props> = ({ teamMembers }) =>
  <p className="anonymous">{ teamMembers.map(({ id, user: { full_name } }) => full_name).join(", ") }</p>

export default TeamMembersDisplay
