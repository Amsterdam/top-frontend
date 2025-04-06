import React, { useMemo, useState } from "react"
import {
  DndContext,
  closestCenter,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  UniqueIdentifier,
  MouseSensor
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import { useItineraries, useItineraryItem } from "app/state/rest"
import calculateNewPosition from "./calculateNewPosition"
import { SortableItem } from "./SortableItem"

type Props = {
  itineraryId: string
  items: Array<
    React.ComponentProps<typeof ItineraryItemCard> & {
      id: string
      itemId: string
      position: number
    }
  >
}

export const itemsPositionSorter = (a: any, b: any) =>
  a.position > b.position ? 1 : -1

const DraggableItineraryItemCardList: React.FC<Props> = ({
  itineraryId,
  items
}) => {
  const [draggableId, setIsDragging] = useState<UniqueIdentifier>()
  const { updateCache } = useItineraries({ lazy: true })
  const { execPatch } = useItineraryItem(draggableId ?? "", { lazy: true })
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10
      }
    })
  )

  const sortedItems = useMemo(
    () => [...items].sort(itemsPositionSorter),
    [items]
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setIsDragging(active.id)
  }

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = sortedItems.findIndex((item) => item.id === active.id)
      const newIndex = sortedItems.findIndex((item) => item.id === over.id)
      const position = calculateNewPosition(sortedItems, oldIndex, newIndex)
      // Update cache te prevent a page refresh when moving between pages
      updateCache((cache) => {
        const item = cache?.itineraries
          .find((_) => _.id.toString() === itineraryId)
          ?.items.find((_) => _.id.toString() === draggableId)

        if (item) {
          item.position = position
        }
      })
      // Execute position PATCH request so teammate can see the change
      execPatch({ position }, { skipCacheClear: true })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={sortedItems}
        strategy={verticalListSortingStrategy}
      >
        {sortedItems.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <ItineraryItemCard {...item} />
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default DraggableItineraryItemCardList
