import React, { FC, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import navigateTo from "../../lib/navigateTo"
import styled from "styled-components"
import IconButton from "../global/IconButton"
import ItineraryItem from "./ItineraryItem"
import useGlobalState from "../../hooks/useGlobalState"
import confirm from "../../lib/utils/confirm"
import NoteIcon from "./NoteIcon"
import SpinnerCheckbox from "./SpinnerCheckbox"
import authUser from "../../lib/authUser"

type Props = {
  itineraryItem: ItineraryItem
  index: number
}

const Div = styled.div`
  transition: opacity 0.6s ease-out;
  opacity: ${ (props: { collapsed: boolean }) => props.collapsed ? 0 : 1 };
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonWrap = styled.div`
  margin: 10px 0 10px 12px;
  display: flex;
  flex-direction: column;
  button:first-child {
    margin-bottom: 15px;
  }
`

const CheckboxWrap = styled.div`
  margin: 10px 12px 10px 0;
`

const DraggableItineraryItem: FC<Props> = ({ itineraryItem, index }) => {
  const {
    itinerariesActions: {
      setChecked,
      remove
    }
  } = useGlobalState()

  const {
    id,
    case: {
      bwv_data: caseItem,
      fraud_prediction: fraudPrediction
     },
    checked,
    notes
  } = itineraryItem

  const noteId = notes.find(note => authUser.isAuthUser(note.author))?.id
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

  const onCheck = () => setChecked(id, !checked)

  // @TODO: Add type for draggableStyle
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    background: "white",
    borderBottom: "1px solid #B4B4B4",
    boxShadow: isDragging ? "0 2px 20px black" : "none",
    padding: isDragging ? "0 20px" : 0,
    outline: 0,
    ...draggableStyle
  })

  // @TODO: Move Inner Component to own file
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
            <CheckboxWrap>
              <SpinnerCheckbox checked={checked} onChange={onCheck}/>
            </CheckboxWrap>
            <ItineraryItem caseItem={ caseItem } fraudPrediction={ fraudPrediction } notes={ notes } />
            <ButtonWrap>
              <IconButton iconNode={ <NoteIcon /> } onClick={ () => navigateTo(notePath) } />
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
