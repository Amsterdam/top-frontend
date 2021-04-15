import React, { useCallback, useMemo } from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { useTeam, useUsers } from "app/state/rest"
import Scaffold from "app/features/shared/components/form/Scaffold"

import { generateFormDefinition } from "./TeamMemberFormDefinition"
import TeamMemberWarning from "./TeamMemberWarning"

type Props = {
  itineraryId: number
  initialUsers: Components.Schemas.User[]
  toggleForm: () => void
}

type FormValues = {
  team_members: Components.Schemas.User[]
}

const TeamMemberForm: React.FC<Props> = ({ toggleForm, itineraryId, initialUsers }) => {
  const { data, isBusy } = useUsers()
  const { execPut } = useTeam(itineraryId, { lazy: true })

  const fields = useMemo(() => generateFormDefinition(data?.results ?? [], toggleForm), [ data, toggleForm ])

  const handleSubmit = useCallback(async (values: FormValues) => {
    await execPut({ team_members: values.team_members.map(user => ({ user })) })
    toggleForm()
  }, [ execPut, toggleForm ])

  return (
    <ScaffoldForm
      initialValues={ { team_members: initialUsers } }
      onSubmit={ handleSubmit }
      showSpinner={ isBusy || !data }
    >
      <Scaffold fields={ fields } />
      <TeamMemberWarning />
    </ScaffoldForm>
  )
}

export default TeamMemberForm
