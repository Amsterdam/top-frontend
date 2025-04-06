import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none" as "none",
    touchAtion: "manipulation",
    outline: 0,
    boxShadow: isDragging ? "0 2px 16px rgba(0, 0, 0, 0.5)" : "none",
    opacity: isDragging ? 0.85 : 1,
    zIndex: isDragging ? 999 : "auto"
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
