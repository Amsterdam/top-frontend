import { getIn } from "final-form"

/**
 * Given value should be intersecting with another value.
 * Example Usage:
 *
 * <Checkboxes name='field' validate={isNotIntersectingWith('otherField')} />
 * <Checkboxes name='otherField' validate={isNotIntersectingWith('field')} />
 *
 */
export const isNotIntersectingWith = (field:string) => (value:any, allValues:object) => {
  const other = getIn(allValues, field)

  if (!Array.isArray(value) || !Array.isArray(other)) {
    console.error("Fields should be arrays")
    return undefined
  }

  for(const item of value) {
    if (other.includes(item)) {
      return `${ item } komt in beide lijstjes voor`
    }
  }

  return undefined
}
