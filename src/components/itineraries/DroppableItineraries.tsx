import React, { FC } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableItinerary from "./DraggableItinerary"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  itineraries: ItineraryItems
}

const Div = styled.div`
  margin: -192px -15px 0
`
const DroppableInner = styled.div`
  margin-top: 192px
  padding: 0 15px
`

const DroppableItineraries: FC<Props> = ({ itineraries }) => {

  const {
    itinerariesActions: {
      move
    }
  } = useGlobalState()

  const onDragEnd = async (result: any) => {
    if (result.destination === null) return
    const { source: { index }, destination: { index: newIndex } } = result
    move(index, newIndex)
  }

  return (
    <Div className="DroppableItineraries">
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="itineraries">
        {
          (provided, snapshot) =>
            <DroppableInner
              ref={ provided.innerRef }
              { ...provided.droppableProps }
            >
              { itineraries.map((itinerary, index) =>
                  <DraggableItinerary key={ itinerary.id } itinerary={ itinerary } index={ index } />)
              }
              { provided.placeholder }
            </DroppableInner>
        }
        </Droppable>
      </DragDropContext>
    </Div>
  )
}
export default DroppableItineraries
