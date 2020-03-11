import React, { FC, FormEvent } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import IconButton from "../global/IconButton"
import styled from "styled-components"

type Props = {
  caseId: CaseId
}

const Div = styled.div`
  span {
    display: inline-block
    width: 100%
    text-align: center
    color: black
    font-weight: normal
  }
  button {
    margin: 10px
  }
`

const SearchResultButtonWrap: FC<Props> = ({ caseId }) => {

  const {
    hasItinerary,
    itineraries: {
      itineraries
    },
    itinerariesActions: {
      add,
      remove
    }
  } = useGlobalState()

  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const firstItinerary = hasItineraries ? itineraries[0] : undefined
  const itineraryId = firstItinerary !== undefined ? firstItinerary.id : undefined

  const onClickAdd = (event: FormEvent) => {
    event.preventDefault()
    if (itineraryId === undefined) return
    add(itineraryId, caseId)
  }

  const onClickRemove = (event: FormEvent) => {
    event.preventDefault()
    const itineraryItem = itineraries[0].items.find(({ case: { bwv_data: { case_id } } }) => case_id === caseId)
    if (itineraryItem === undefined) return
    const { id } = itineraryItem
    remove(id)
  }

  const isItinerary = hasItinerary(caseId)
  const showAddButton = isItinerary === false
  const showRemoveButton = !showAddButton

  return (
    <div className="SearchResultButtonWrap">
      { showAddButton &&
        <IconButton icon="Enlarge" onClick={ onClickAdd } />
      }
      { showRemoveButton &&
        <Div>
          <span>In lijst</span>
          <IconButton icon="TrashBin" onClick={ onClickRemove } size={ 40 } border={ false } />
        </Div>
      }
    </div>
  )
}
export default SearchResultButtonWrap
