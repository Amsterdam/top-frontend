import React from "react"
import { useFormState } from "react-final-form"
import styled from "styled-components"

import {useLoggedInUser} from "app/state/rest/custom/useLoggedInUser"

const Warning = styled.p`
  color: red;
`

const TeamMemberWarning:React.FC = () => {
  const { values } = useFormState()
  const loggedInUser = useLoggedInUser()

  const included = values?.team_members?.map((_:Components.Schemas.User) => _.id)?.includes(loggedInUser?.id)

  return values && loggedInUser && !included
    ? <Warning>Let op! Je bent zelf niet meer als teamlid geselecteerd. Wanneer je op ‘Bewaren’ klikt vervalt je toegang tot deze lijst.</Warning>
    : null
}

export default TeamMemberWarning
