import React, { FC, useState, ChangeEvent, FormEvent } from "react"
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
  const filteredUsers = usersArray.filter(({ id }) => ![teamMember0, teamMember1, teamMember2].includes(id))

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
    const s = { ...settings, lists }
    create(s, userIds, num)
  }

  return (
    <div className="Generate">
      <h1>Genereer je looplijst</h1>
      <form onSubmit={ onSubmit }>
        { team.map((tuple, index) => {
            const [value, onChange] = tuple
            const user = value !== "" ? usersArray.find(({ id }) => id === value) : undefined
            return <div key={ index }>
              <label>Teamlid { index + 1 }</label>
              <Select value={ value } onChange={ onChange } disabled={ disabled }>
                <option value="">-</option>
                { user !== undefined &&
                  <option value={ value }>{ `${ user.first_name } (${ user.email })` }</option>
                }
                { filteredUsers.map(({ id, first_name, email }) =>
                  <option key={ id } value={ id }>{ `${ first_name } (${ email })` }</option>)
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
