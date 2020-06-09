import React from "react"
import { useFormState } from "react-final-form"

import { useLoggedInUser } from "../../../../../../state/useLoggedInUser"
import ErrorMessage from "../../../../../global/ErrorMessage"

const wasSelected = (users: User[], loggedInUser?: User) =>
  Array.isArray(users) && loggedInUser && users
    .map(_ => _.id)
    .includes(loggedInUser.id)

const LoggedInUserWasNotSelectedMessage: React.FC = () => {
  const loggedInUser = useLoggedInUser()
  const { values: { users } } = useFormState()

  if (!wasSelected(users, loggedInUser)) {
    return <ErrorMessage text="Let op! Je bent zelf niet meer als teamlid geselecteerd. Wanneer je op ‘Bewaren’ klikt vervalt je toegang tot deze lijst" />
  }

  return null
}

export default LoggedInUserWasNotSelectedMessage
