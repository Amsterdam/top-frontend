import React, { FC, useState, ChangeEvent, FormEvent } from "react"
import styled from "styled-components"
import { Select, Button } from "@datapunt/asc-ui"
import Input from "../styled/Input"
import { listsDay } from "../../config/planning"
import useOnChangeState from "../../hooks/useOnChangeState"
import useGlobalState from "../../hooks/useGlobalState"

const Generate: FC = () => {

  const {
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

  const [teamMember0, onChangeTeamMember0] = useOnChangeState("")
  const [teamMember1, onChangeTeamMember1] = useOnChangeState("")
  const [teamMember2, onChangeTeamMember2] = useOnChangeState("")
  const team: [string, OnChangeHandler][] = [
    [teamMember0, onChangeTeamMember0],
    [teamMember1, onChangeTeamMember1],
    [teamMember2, onChangeTeamMember2]
  ]
  const disabled = users === undefined
  const filteredUsers = usersArray.filter(({ firstName }) =>
    firstName !== teamMember0 && firstName !== teamMember1 && firstName !== teamMember2
  )

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
    const userIds = [teamMember0, teamMember1, teamMember2]
      .map(member => {
        const user = usersArray.find(user => member === user.firstName)
        return user !== undefined ? user.id : undefined
      })
      .filter(id => id !== undefined)
    const { settings } = data
    const day = (new Date()).getDay()
    const dayIndex = day - 1 < 0 ? 6 : day - 1 // correct sunday => 6
    const dayLists = listsDay(settings.lists, dayIndex)
    const lists = dayLists.length >= 3 && dayPart === "evening" ? dayLists[2] : dayLists[0]
    const s = { ...settings, lists }
    create(s, userIds, dayPart, num)
  }

  return (
    <div className="Generate">
      <h1>Genereer</h1>
      <form onSubmit={ onSubmit }>
        { team.map((tuple, index) => {
            const [value, onChange] = tuple
            return <div key={ index }>
              <label>Teamlid { index + 1 }</label>
              <Select value={ value } onChange={ onChange } disabled={ disabled }>
                <option value="">-</option>
                { value !== "" &&
                  <option value={ value }>{ value }</option>
                }
                { filteredUsers.map(({ firstName }) =>
                  <option key={ firstName } value={ firstName }>{ firstName }</option>)
                }
              </Select>
            </div>
          })
        }
        <div>
          <input type="radio" checked={ isDay } onChange={ setDay } />
          <label>dag</label>
          <input type="radio" checked={ isEvening } onChange={ setEvening } />
          <label>avond</label>
        </div>
        <div>
          <label>Aantal adressen</label>
          <Input type="number" value={ num } onChange={ onChangeNum } />
        </div>
        <Button type="submit" variant="secondary" disabled={ isDisabled }>Genereer</Button>
      </form>
    </div>
  )

}
export default Generate
