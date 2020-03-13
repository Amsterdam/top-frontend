import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Select, Button } from "@datapunt/asc-ui"
import Input from "../styled/Input"
import { listsDay } from "../../config/planning"
import useOnChangeState from "../../hooks/useOnChangeState"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"

const H1 = styled.h1`
  font-size: 24px
`
const H2 = styled.h1`
  font-size: 16px
`
const Label = styled.label`
  font-weight: bold
`
const Label2 = styled.label`
  margin-right: 36px
`
const Div = styled.div`
  margin-bottom: 24px
`
const StyledInput = styled(Input)`
  width: 72px
`
const RadioButton = styled.input`
  margin-right: 8px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
`

const Generate: FC = () => {

  const {
    auth: {
      user: authUser
    },
    itinerariesActions: {
      create
    },
    planningSettings: {
      data
    },
    users: {
      results: users
    }
  } = useGlobalState()

  const usersArray = users !== undefined ? users : []

  const [teamMember0, onChangeTeamMember0, setTeamMember0] = useOnChangeState("")
  const [teamMember1, onChangeTeamMember1] = useOnChangeState("")
  const [teamMember2, onChangeTeamMember2] = useOnChangeState("")
  const team: [string, OnChangeHandler][] = [
    [teamMember0, onChangeTeamMember0],
    [teamMember1, onChangeTeamMember1],
    [teamMember2, onChangeTeamMember2]
  ]
  const disabled = users === undefined
  const filteredUsers = usersArray.filter(({ id }) => ![teamMember0, teamMember1, teamMember2].includes(id))

  useEffect(() => {
    if (users === undefined) return
    if (authUser === undefined) return
    const { email } = authUser
    if (email === undefined) return
    const user = users.find(user => user.email === email)
    if (user === undefined) return
    const { id } = user
    setTeamMember0(id)
  }, [authUser, users, setTeamMember0])

  const [dayPart, setDayPart] = useState<"day" | "evening">("day")
  const isDay = dayPart === "day"
  const isEvening = dayPart === "evening"
  const setDay = () => setDayPart("day")
  const setEvening = () => setDayPart("evening")

  const [num, setNum] = useState<number | "">(8)
  const onChangeNum = (event: ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(event.target.value, 10)
    setNum(Number.isNaN(n) ? "" : n)
  }

  const isDisabled = teamMember0 === "" || teamMember1 === "" || teamMember2 === "" || num === ""
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (data === undefined) return
    if (typeof num !== "number") return
    const userIds = [teamMember0, teamMember1, teamMember2]
    const { settings } = data
    const day = (new Date()).getDay()
    const dayIndex = day - 1 < 0 ? 6 : day - 1 // correct sunday => 6
    const dayLists = listsDay(settings.lists, dayIndex)
    const lists = dayLists.length >= 3 && dayPart === "evening" ? dayLists[2] : dayLists[0]
    const listsSettings = { ...settings, lists }
    create(listsSettings, userIds, num)
  }

  return (
    <div className="Generate">
      <H1>Genereer je looplijst</H1>
      <H2>Wie zitten er vandaag in je team?</H2>
      <form onSubmit={ onSubmit }>
        { team.map((tuple, index) => {
            const [value, onChange] = tuple
            const user = value !== "" ? usersArray.find(({ id }) => id === value) : undefined
            const label = index <= 1 ? `Toezichthouder ${ index + 1 }` : "Handhaver"
            return (
              <Div key={ index }>
                <Label>{ label }</Label>
                <Select value={ value } onChange={ onChange } disabled={ disabled }>
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
        <Div>
          <H2>Wat voor looplijst wil je maken?</H2>
          <RadioButton type="radio" checked={ isDay } onChange={ setDay } />
          <Label2>daglijst</Label2>
          <RadioButton type="radio" checked={ isEvening } onChange={ setEvening } />
          <Label2>avondlijst</Label2>
        </Div>
        <Div>
          <Label>Hoeveel adressen wil je in je looplijst?</Label>
          <div>
            <StyledInput type="number" value={ num } onChange={ onChangeNum } />
          </div>
        </Div>
        <ButtonWrap>
          <Button type="submit" variant="secondary" disabled={ isDisabled }>Genereer looplijst</Button>
        </ButtonWrap>
      </form>
    </div>
  )

}
export default Generate
