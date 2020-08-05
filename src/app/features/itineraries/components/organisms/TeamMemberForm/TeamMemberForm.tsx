import React, { useCallback, useMemo } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import { useTeam, useUsers } from "app/state/rest"

import Scaffold from "app/features/shared/components/form/Scaffold"

import { generateFormDefinition } from "./formDefinition"
import TeamMemberWarning from "./TeamMemberWarning"

type Props = {
  itineraryId: number
  toggleForm: () => void
  initialUsers: Components.Schemas.User[]
}

type FormValues = {
  team_members: Components.Schemas.User[]
}

const TeamMemberForm: React.FC<Props> = ({ toggleForm, itineraryId, initialUsers }) => {
  const { data, isBusy } = useUsers()
  const { execPut } = useTeam(itineraryId, { lazy: true })


  const fields = useMemo(() => generateFormDefinition(data?.results, toggleForm), [data, toggleForm])

  const handleSubmit = useCallback(async (values: FormValues) => {
    await execPut({ team_members: values.team_members.map(user => ({ user })) })
    toggleForm()
  }, [ execPut, toggleForm ])

  return (
    <ScaffoldForm
      showSpinner={isBusy || !data}
      onSubmit={handleSubmit}
      initialValues={{ team_members: initialUsers }}
    >
      <Scaffold fields={fields} />
      <TeamMemberWarning />
    </ScaffoldForm>
  )
}

export default TeamMemberForm
