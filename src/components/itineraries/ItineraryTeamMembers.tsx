import React, { FC, FormEvent } from "react"
import { Select, Button } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import useOnChangeState from "../../hooks/useOnChangeState"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"

type Props = {
  itineraryId: Id
  teamMembers: TeamMembers
  isEditing?: boolean
  unsetIsEditing: () => void
}

const Div = styled.div`
  margin-bottom: 12px
`
const Label = styled.label`
  font-weight: bold
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
`
const StyledButton = styled(Button)`
  margin: 12px
`

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

  const usersArray = users !== undefined ? users : []

  const [teamMember0, onChangeTeamMember0] = useOnChangeState(teamMembers[0].user.id)
  const [teamMember1, onChangeTeamMember1] = useOnChangeState(teamMembers[1].user.id)
  const [teamMember2, onChangeTeamMember2] = useOnChangeState(teamMembers[2].user.id)
  const team: [string, OnChangeHandler][] = [
    [teamMember0, onChangeTeamMember0],
    [teamMember1, onChangeTeamMember1],
    [teamMember2, onChangeTeamMember2]
  ]
  const filteredUsers = usersArray.filter(({ id }) => ![teamMember0, teamMember1, teamMember2].includes(id))
  const authUserIsSelected = team.filter(tuple => {
    const [id] = tuple
    if (users === undefined) return false
    if (authUser === undefined) return false
    const { email } = authUser
    if (email === undefined) return false
    const user = users.find(user => user.email === email)
    if (user === undefined) return false
    return user.id === id
  }).length > 0

  const onClickClose = (event: FormEvent) => {
    event.preventDefault()
    unsetIsEditing()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await updateTeam(itineraryId, [teamMember0, teamMember1, teamMember2], !authUserIsSelected)
    unsetIsEditing()
  }

  return (
    <Div>
      { !isEditing &&
        teamMembers.map(({ id, user: { full_name } }) =>
        <p key={ id }>{ `${ full_name }` }</p>)
      }
      { isEditing &&
        <form onSubmit={ onSubmit }>
          { team.map((tuple, index) => {
              const [value, onChange] = tuple
              const user = value !== "" ? usersArray.find(({ id }) => id === value) : undefined
              const label = index <= 1 ? `Toezichthouder ${ index + 1 }` : "Handhaver"
              return (
                <Div key={ index }>
                  <Label>{ label }</Label>
                  <Select value={ value } onChange={ onChange }>
                    <option value="">-</option>
                    { user !== undefined &&
                      <option value={ value }>{ `${ user.full_name }` }</option>
                    }
                    { filteredUsers.map(({ id, full_name }) =>
                      <option key={ id } value={ id }>{ `${ full_name }` }</option>)
                    }
                  </Select>
                </Div>
              )
            })
          }
          { !authUserIsSelected &&
            <ErrorMessage text="Pas op! Je bent zelf niet meer als team lid geselecteerd. Je toegang tot deze looplijst vervalt." />
          }
          <ButtonWrap>
            <StyledButton variant="textButton" onClick={ onClickClose }>sluiten</StyledButton>
            <Button variant="secondary">Opslaan</Button>
          </ButtonWrap>
        </form>
      }
    </Div>
  )
}
export default ItineraryTeamMembers
