import React, { FC, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { navigate } from "@reach/router"
import { to } from "../../config/page"
import styled from "styled-components"
import IconButton from "../global/IconButton"
import ItineraryItem from "./ItineraryItem"
import useGlobalState from "../../hooks/useGlobalState"
import confirm from "../../lib/utils/confirm"
import NoteIcon from "./NoteIcon"

type Props = {
  itineraryItem: ItineraryItem
  index: number
}

const Div = styled.div`
  transition: opacity 0.6s ease-out
  opacity: ${ (props: { collapsed: boolean }) => props.collapsed ? 0 : 1 }
`

const Inner = styled.div`
  display: flex
  justify-content: space-between
`

const ButtonWrap = styled.div`
  margin: 10px 0
  button:first-child {
    margin-bottom: 10px
  }
`

const DraggableItineraryItem: FC<Props> = ({ itineraryItem, index }) => {

  const {
    itinerariesActions: {
      remove
    }
  } = useGlobalState()

  const {
    id,
    case: {
      bwv_data: caseItem,
      fraud_prediction: fraudPrediction
     },
    notes
  } = itineraryItem
  const noteId = notes[0] && notes[0].id
  const noteText = notes[0] && notes[0].text
  const notePath = `notes/${ id }/${ noteId || "" }`

  const [isCollapsed, setCollapse] = useState(false)
  const collapse = () => setCollapse(true)

  const onClick = () => confirm(
    "Weet je zeker dat je deze zaak (en eventuele notities) uit je looplijst wilt verwijderen?",
    () => {
      collapse()
      window.setTimeout(() => remove(id), 500)
    }
  )

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    background: "white",
    borderBottom: "1px solid #B4B4B4",
    boxShadow: isDragging ? "0 2px 20px black" : "none",
    padding: isDragging ? "0 20px" : 0,
    ...draggableStyle
  })

  return (
    <Div collapsed={ isCollapsed }>
      <Draggable key={ String(id) } draggableId={ String(id) } index={ index }>
      { (provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          style={ getItemStyle(snapshot.isDragging, provided.draggableProps.style) }
        >
          <Inner>
            <ItineraryItem caseItem={ caseItem } fraudPrediction={ fraudPrediction } note={ noteText } />
            <ButtonWrap>
              <IconButton iconNode={ <NoteIcon /> } onClick={ () => navigate(to(notePath)) } />
              <IconButton icon="TrashBin" onClick={ onClick } />
            </ButtonWrap>
          </Inner>
        </div>
      ) }
      </Draggable>
    </Div>
  )
}
export default DraggableItineraryItem
