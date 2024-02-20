import { useLocation } from "react-router-dom"
import { parse, queryString } from "./queryString"

/**
 * Example usage:
 * ```
 * const queryString = useQueryString()
 *
 *  // Assume current address is: path/?something=1&somethingElse=2
 *
 *  const url = queryString
 *    .setParameter('foo', 'foo')
 *    .deleteParameter('somethingElse')
 *    .getUrl()   //  'path?something=1&foo=foo'
 *
 * // (or use '.navigateToUrl()' to directly navigate to it.)
 *
 * ```
 */

export const useQueryString = () => {
  const { pathname, search } = useLocation()
  return queryString(pathname, parse(search))
}
