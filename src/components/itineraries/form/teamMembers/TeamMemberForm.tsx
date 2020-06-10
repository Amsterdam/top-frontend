import React, { useMemo } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import { generateTeamMemberFormDefinition } from "./teamMemberFormDefinition"
import Scaffold from "../../../form/Scaffold"
import LoggedInUserWasNotSelectedMessage
  from "./components/LoggedInUserWasNotSelected/LoggedInUserWasNotSelectedMessage"

type Props = {
  onSubmit: (values: FormValues) => void
  onReset: () => void
  initialUsers: User[]
  users: User[]
}

type FormValues = {
  users: User[]
}

const TeamMemberForm: React.FC<Props> = ({ onReset, onSubmit, users, initialUsers }) => {
  const fields = useMemo(() => generateTeamMemberFormDefinition(users), [users])
  return (
    <ScaffoldForm onReset={onReset} onSubmit={onSubmit} initialValues={{ users: initialUsers }}>
      <Scaffold fields={fields} />
      <LoggedInUserWasNotSelectedMessage />
    </ScaffoldForm>
  )
}

export default TeamMemberForm
