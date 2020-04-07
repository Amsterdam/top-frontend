import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Select, Button } from "@datapunt/asc-ui"
import {Link, navigate} from "@reach/router"
import H1 from "../styled/H1"
import Input from "../styled/Input"
import { listsDay } from "../../config/planning"
import useOnChangeState from "../../hooks/useOnChangeState"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import isWeekDay from "../../lib/utils/isWeekDay"
import AddStartAddressModal from "./add-start-address/AddStartAddressModal"
import {to} from "../../config/page"
import StartAddress from "./add-start-address/StartAddress"
import parseLocationSearch from "../../lib/utils/parseLocationSearch"
import CaseModal from "./add-start-address/CadeModal"
import {To} from "../search/SearchResults"
import {deleteQueryParam} from "../../lib/utils/deleteQueryParam"
import {setQueryParam} from "../../lib/utils/setQueryParam"

const Label = styled.label`
  font-weight: bold
`
const Label2 = styled.label`
  font-weight: bold
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

const QS_CASE_MODAL = 'modalCaseId'
const QS_ADD_ADDRESS_MODAL = 'addAddressModal'

const Generate: FC = () => {
  const {
    auth: {
      user: authUser
    },
    itineraries: {
      isFetching
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

  const [authUserId, setAuthUserId] = useState<UUID | undefined>(undefined)
  const [teamMember0, onChangeTeamMember0, setTeamMember0] = useOnChangeState("")
  const [teamMember1, onChangeTeamMember1] = useOnChangeState("")
  const [teamMember2, onChangeTeamMember2] = useOnChangeState("")
  const team: [string, OnChangeHandler][] = [
    [teamMember0, onChangeTeamMember0],
    [teamMember1, onChangeTeamMember1],
    [teamMember2, onChangeTeamMember2]
  ]
  const userSelectDisabled = users === undefined
  const filteredUsers = usersArray.filter(({ id }) => ![teamMember0, teamMember1, teamMember2].includes(id))

  useEffect(() => {
    if (users === undefined) return
    if (authUser === undefined) return
    const { email } = authUser
    if (email === undefined) return
    const user = users.find(user => user.email === email)
    if (user === undefined) return
    const { id } = user
    setAuthUserId(id)
    setTeamMember0(id)
  }, [authUser, users, setTeamMember0])

  const [dayPart, setDayPart] = useState<"day" | "evening">("day")
  const isDay = dayPart === "day"
  const isEvening = dayPart === "evening"
  const setDay = () => setDayPart("day")
  const setEvening = () => setDayPart("evening")
  const showWeekDay = isWeekDay()
  const showWeekend = !showWeekDay

  const { addAddressModal, modalCaseId } = parseLocationSearch(window.location.search)
  const showAddAddressModal = addAddressModal !== undefined
  const showCaseModal = modalCaseId !== undefined

  const [num, setNum] = useState<number | "">(8)
  const onChangeNum = (event: ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(event.target.value, 10)
    setNum(Number.isNaN(n) ? "" : n)
  }

  const disabled = isFetching || teamMember0 === "" || teamMember1 === "" || teamMember2 === "" || num === ""
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (isFetching) return
    if (data === undefined) return
    if (typeof num !== "number") return
    const userIds = [teamMember0, teamMember1, teamMember2]
    const selfIncluded = authUserId !== undefined && userIds.includes(authUserId)
    const { settings } = data
    const day = (new Date()).getDay()
    const dayIndex = day - 1 < 0 ? 6 : day - 1 // correct sunday => 6
    const dayLists = listsDay(settings.lists, dayIndex)
    const lists = dayLists.length >= 3 && dayPart === "evening" ? dayLists[2] : dayLists[0]
    const listsSettings = { ...settings, lists }
    create(listsSettings, userIds, num, selfIncluded)
  }

  const [startAddressCaseId, setStartAddressCaseId] = useState<CaseId | undefined>(undefined)
  const showStartAddress = startAddressCaseId !== undefined

  const caseTo:To = (caseId:CaseId) => setQueryParam(window.location.search, QS_CASE_MODAL, caseId)
  const closeAddAddressModal = () => navigate(to(deleteQueryParam(window.location.search, QS_ADD_ADDRESS_MODAL)))
  const closeCaseModal = () => navigate(to(deleteQueryParam(window.location.search, QS_CASE_MODAL)))

  const onAddStartAddress = (caseId:CaseId) => {
    setStartAddressCaseId(caseId)
    closeAddAddressModal()
  }

  return (
    <div className="Generate">
      <H1>Genereer je looplijst</H1>
      <p>Wie zitten er vandaag in je team?</p>
      <form onSubmit={ onSubmit }>
        { team.map((tuple, index) => {
          const [value, onChange] = tuple
          const user = value !== "" ? usersArray.find(({ id }) => id === value) : undefined
          const label = index <= 1 ? `Toezichthouder ${ index + 1 }` : "Handhaver"
          return (
            <Div key={ index }>
              <Label>{ label }</Label>
              <Select value={ value } onChange={ onChange } disabled={ userSelectDisabled }>
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
          <p>Wat voor looplijst wil je maken?</p>
          { showWeekDay &&
          <>
            <RadioButton id="day" type="radio" checked={ isDay } onChange={ setDay } />
            <Label2 htmlFor="day">daglijst</Label2>
            <RadioButton id="evening" type="radio" checked={ isEvening } onChange={ setEvening } />
            <Label2 htmlFor="evening">avondlijst</Label2>
          </>
          }
          { showWeekend &&
          <>
            <RadioButton id="weekend" type="radio" checked={ true } />
            <Label2 htmlFor="weekend">weekend</Label2>
          </>
          }
        </Div>
        <Div>
          <p>Hoeveel adressen wil je in je looplijst?</p>
          <div>
            <StyledInput type="number" value={ num } onChange={ onChangeNum } />
          </div>
        </Div>
        <Div>
          {
            showStartAddress
              ? (<>
                <Div>
                  <StartAddress caseId={startAddressCaseId!} to={caseTo} />
                </Div>
                <Div>
                  <Button type='button' variant='primary' onClick={() => setStartAddressCaseId(undefined)}>
                    Verwijder startadres
                  </Button>
                </Div>
              </>)
              : (<Div>
                <Link to={to(setQueryParam(window.location.search, QS_ADD_ADDRESS_MODAL, '1'))}>
                  <Button type='button' variant="textButton">
                    Ik wil starten bij een specifiek adres
                  </Button>
                </Link>
              </Div>)
          }
        </Div>
        <ButtonWrap>
          <Button type="submit" variant="secondary" disabled={ disabled }>Genereer looplijst</Button>
        </ButtonWrap>
      </form>
      {showAddAddressModal && <AddStartAddressModal
        onClose={closeAddAddressModal}
        onAddStartAddress={onAddStartAddress}
        to={caseTo}
      />}
      {showCaseModal && <CaseModal
        onClose={closeCaseModal}
        caseId={modalCaseId}
      />}
    </div>
  )
}
export default Generate
