import { queryStringProp } from "./queryStringProp"
import { useQueryString } from "./useQueryString"

/**
 * Example usage:
 * ```
 * const queryStringProp = useQueryStringProp('foo')
 *
 *  // Assume current address is: path/?something=1
 *
 * const url = queryStringProp
 *    .set('fooValue')
 *    .getUrl()   //  'path?something=1&foo=fooValue'
 * // (or use '.navigateToUrl()' to directly navigate to it.)
 * ```
 */
export const useQueryStringProp = (prop: string) => {
  const editor = useQueryString()
  return queryStringProp(editor, prop)
}
