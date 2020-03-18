import React, { FC, FormEvent } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import IconButton from "../global/IconButton"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  caseId: CaseId
}

const Div = styled.div`
  margin-top: 24px
  button {
    padding: 12px
  }
`

const SearchResultButtonWrap: FC<Props> = ({ caseId }) => {

  const {
    hasItinerary,
    itineraries: {
      isFetching,
      itineraries
    },
    itinerariesActions: {
      add,
      remove
    },
    searchActions: {
      setTeam
    }
  } = useGlobalState()

  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const firstItinerary = hasItineraries ? itineraries[0] : undefined
  const itineraryId = firstItinerary !== undefined ? firstItinerary.id : undefined

  const onClickAdd = (event: FormEvent) => {
    event.preventDefault()
    if (itineraryId === undefined) return
    add(itineraryId, caseId)
    const team = itineraries.length > 0 ? itineraries[0].team_members : undefined
    if (team === undefined) return
    setTeam(caseId, team)
  }

  const onClickRemove = (event: FormEvent) => {
    event.preventDefault()
    const itineraryItem = itineraries[0].items.find(({ case: { bwv_data: { case_id } } }) => case_id === caseId)
    if (itineraryItem === undefined) return
    const { id } = itineraryItem
    remove(id)
    setTeam(caseId)
  }

  const isItinerary = hasItinerary(caseId)
  const showAddButton = isItinerary === false
  const showRemoveButton = !showAddButton
  const disabled = isFetching

  return (
    <div className="SearchResultButtonWrap">
      { showAddButton &&
        <IconButton icon="Enlarge" onClick={ onClickAdd } disabled={ disabled } />
      }
      { showRemoveButton &&
        <Div>
          <Button variant="textButton" onClick={ onClickRemove } disabled={ disabled }>undo</Button>
        </Div>
      }
    </div>
  )
}
export default SearchResultButtonWrap
