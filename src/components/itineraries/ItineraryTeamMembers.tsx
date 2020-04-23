import React, { FC, FormEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import TeamMembersDisplay from "./TeamMembersDisplay"
import { Form } from "react-final-form"
import TeamMemberFields from "./TeamMemberFields"
import { filterNullish } from "../../lib/utils/filterNullish"
import { findByProperty } from "../../lib/utils/findByProperty"

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
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`
const StyledButton = styled(Button)`
  margin: 12px;
`

type FormValues = {
  users: Array<undefined | null | string>
}

const ItineraryTeamMembers: FC<Props> = ({ itineraryId, teamMembers, isEditing = false, unsetIsEditing }) => {
  const {
    auth: {
      user: authUser
    },
    itinerariesActions: {
      updateTeam
    },
    users: {
      results: users
    }
  } = useGlobalState()

  const initialUsers = teamMembers.map(member => member.user.id)
  const loggedInUser = findByProperty(users, "email", authUser?.email)

  const onClickClose = (event: FormEvent) => {
    event.preventDefault()
    unsetIsEditing()
  }

  const onSubmit = async (formValues:FormValues) => {
    const removeItinerary = !formValues.users.includes(loggedInUser?.id)

    await updateTeam(
      itineraryId,
      filterNullish(formValues.users),
      removeItinerary
    )

    if (!removeItinerary) {
      unsetIsEditing()
    }
  }

  return (
    <Div>
      { !isEditing
          ? (<TeamMembersDisplay teamMembers={ teamMembers } />)
          : (<Form
          keepDirtyOnReinitialize={true}
          onSubmit={onSubmit}
          initialValues={{ users: initialUsers }}
          render={({ handleSubmit, values }) => {
            // TODO use form-validation for this.
            const isSubmitDisabled = filterNullish(values.users).length < 3
            const authUserIsSelected = values.users.includes(loggedInUser?.id || "")

            return (<form onSubmit={handleSubmit}>
              <TeamMemberFields users={users ?? []} alreadySelectedUserIds={values.users}/>
              { !authUserIsSelected &&
                <ErrorMessage text="Let op! Je bent zelf niet meer als teamlid geselecteerd. Wanneer je op ‘Bewaren’ klikt vervalt je toegang tot deze lijst" />
              }
              <ButtonWrap>
                <StyledButton variant="textButton" onClick={ onClickClose }>Annuleren</StyledButton>
                <Button variant="secondary" disabled={isSubmitDisabled}>Bewaren</Button>
              </ButtonWrap>
            </form>)
          }}
        />)
      }
    </Div>
  )
}
export default ItineraryTeamMembers
