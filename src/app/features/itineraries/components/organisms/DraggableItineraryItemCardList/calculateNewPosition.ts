const calculateNewPosition = (items: { position: number }[], index: number, newIndex: number): number => {
  if (index === newIndex) return items[index].position

  const movedBackwards = index < newIndex
  const i = movedBackwards ? newIndex + 1 : newIndex
  const precedingPosition: number = i > 0 ? items[i - 1].position : 0
  const length = items.length
  const succeedingPosition = i <= length - 1 ? items[i].position : undefined
  const position = succeedingPosition ? (
      precedingPosition + ((succeedingPosition - precedingPosition) / 2)
    ) : items[length - 1].position + 10

  return position
}

export default calculateNewPosition
