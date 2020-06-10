import React, { FC, useCallback } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import styled from "styled-components"
import TeamMembersDisplay from "./TeamMembersDisplay"
import TeamMemberForm from "./form/teamMembers/TeamMemberForm"
import { useLoggedInUser } from "../../state/useLoggedInUser"

type Props = {
  itineraryId: Id
  teamMembers: TeamMembers
  isEditing?: boolean
  unsetIsEditing: () => void
}

const Div = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #B4B4B4;
  margin-bottom: 12px;
`
type FormValues = {
  users: User[]
}

const ItineraryTeamMembers: FC<Props> = ({ itineraryId, teamMembers, isEditing = false, unsetIsEditing }) => {
  const {
    users: {
      results: users
    }
  } = useGlobalState()

  const {
    itinerariesActions: {
      updateTeam
    }
  } = useGlobalActions()

  const loggedInUser = useLoggedInUser()

  const handleSubmit = useCallback(async ({ users }: FormValues) => {
    const ids = users.map(_ => _.id)
    const removeItinerary = !ids.includes(loggedInUser!.id)

    await updateTeam(itineraryId, ids, removeItinerary)

    if (!removeItinerary) {
      unsetIsEditing()
    }
  }, [ loggedInUser, itineraryId, unsetIsEditing, updateTeam ])

  const initialValues = teamMembers.map(member => member.user)

  return (
    <Div>
      { !isEditing
          ? (<TeamMembersDisplay teamMembers={ teamMembers } />)
          : (<TeamMemberForm onSubmit={handleSubmit} onReset={unsetIsEditing} users={users!} initialUsers={initialValues} />)
      }
    </Div>
  )
}
export default ItineraryTeamMembers
