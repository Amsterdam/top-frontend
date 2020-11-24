import React, { useCallback, useMemo, useState } from "react"
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DragStart,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import { useItineraries, useItineraryItem } from "app/state/rest"
import calculateNewPosition from "./calculateNewPosition"

type Props = {
  itineraryId: string
  items: Array<React.ComponentProps<typeof ItineraryItemCard> & {id: string, itemId: string, position: number}>
}

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  userSelect: "none",
  background: isDragging ? "white" : "none",
  boxShadow: isDragging ? "0 2px 20px black" : "none",
  padding: isDragging ? "0 20px" : 0,
  outline: 0,
  ...draggableStyle
})

const DraggableItineraryItemCardList: React.FC<Props> = ({ itineraryId, items }) => {
  const [ draggableId, setIsDragging ] = useState<string>()

  const { updateCache } = useItineraries({ lazy: true })
  const { execPatch } = useItineraryItem(draggableId ?? "", { lazy: true })

  const sortedItems = useMemo(() => [ ...items ].sort((a, b) => a.position > b.position ? 1 : -1), [ items ])

  const handleDragStart = useCallback(({ draggableId }: DragStart) => {
    setIsDragging(draggableId)
  }, [ setIsDragging ])

  const handleDragEnd = useCallback(async ({ destination, source }: DropResult) => {
    if (destination?.index !== undefined && source.index !== undefined) {
      const position = calculateNewPosition(
        sortedItems,
        source.index,
        destination.index
      )

      // Update cache:
      updateCache((cache) => {
        const item = cache
          ?.itineraries.find(_ => _.id.toString() === itineraryId)
          ?.items.find(_ => _.id.toString() === draggableId)

        if (item) {
          item.position = position
        }
      })

      // Execute PATCH request
      await execPatch({ position }, { skipCacheClear: true })
    }
  }, [ sortedItems, execPatch, draggableId, itineraryId, updateCache ])

  return (
    <DragDropContext onDragEnd={ handleDragEnd } onDragStart={ handleDragStart }>
      <Droppable droppableId="itineraryItems">
        { (provided) =>
          <div ref={ provided.innerRef } { ...provided.droppableProps }>
            { sortedItems.map((item, index) => (
              <Draggable key={ item.id } draggableId={ item.itemId.toString() } index={ index }>
                { (provided, snapshot) => (
                  <div
                    ref={ provided.innerRef }
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    // @ts-ignore
                    style={ getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    ) }
                  >
                    <ItineraryItemCard { ...item } />
                  </div>
                ) }
              </Draggable>
            )) }
            { provided.placeholder }
          </div>
        }
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableItineraryItemCardList
