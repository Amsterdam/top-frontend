import React, { FC } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableItineraryItem from "./DraggableItineraryItem"
import useGlobalActions from "../../hooks/useGlobalActions"

type Props = {
  id: Id
  itineraryItems: ItineraryItems
}

const Div = styled.div`
  margin: -192px -15px 0;
`
const DroppableInner = styled.div`
  margin-top: 192px;
  padding: 0 15px;
`

const DroppableItinerary: FC<Props> = ({ id, itineraryItems }) => {
  const {
    itinerariesActions: {
      move
    }
  } = useGlobalActions()

  const onDragEnd = async (result: any) => {
    if (result.destination === null) return
    const { source: { index }, destination: { index: newIndex } } = result
    move(id, index, newIndex)
  }

  return (
    <Div>
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="itineraryItems">
        {
          (provided, snapshot) =>
            <DroppableInner
              ref={ provided.innerRef }
              { ...provided.droppableProps }
            >
              { itineraryItems.map((item, index) =>
                  <DraggableItineraryItem key={ item.id } itineraryItem={ item } index={ index } />)
              }
              { provided.placeholder }
            </DroppableInner>
        }
        </Droppable>
      </DragDropContext>
    </Div>
  )
}
export default DroppableItinerary
