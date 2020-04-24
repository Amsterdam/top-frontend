const moveInArray = <T>(arr: Array<T>, index: Index, newIndex: Index): Array<T> => {
  const clone = [...arr]
  clone.splice(newIndex, 0, clone.splice(index, 1)[0])
  return clone
}
export default moveInArray
