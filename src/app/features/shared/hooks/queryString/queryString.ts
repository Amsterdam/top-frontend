import qs, { ParsedQs } from "qs"

export const parse = (search: string) => qs.parse(search, { ignoreQueryPrefix: true })
const stringify = (parsed: ParsedQs) => qs.stringify(parsed, { addQueryPrefix: true })

const removeProp = (obj: ParsedQs, prop: string) => Object
  .entries(obj)
  .filter(([ key ]) => key !== prop)
  .reduce((acc, [ key, val ]) => ({ ...acc, [key]: val }), {})

/**
 * Immutable queryString manager.
 * Because its immutable you can use it safely within a hook.
 *
 * @see `useQueryString`
 */

export const queryString = (path: string, parsedQs: ParsedQs, navigate: any) => {
  const getUrl = () => `${ path }${ stringify(parsedQs) }`

  const navigateToUrl = () => navigate(getUrl())

  const getParameter = (param: string) => parsedQs[param]

  const hasParameter = (param: string) => parsedQs[param] !== undefined

  const setParameter = (param: string, value: string) => queryString(path, { ...parsedQs, [param]: value }, navigate)

  const deleteParameter = (param: string) => queryString(path, removeProp(parsedQs, param), navigate)

  return {
    getUrl,
    navigateToUrl,
    getParameter,
    hasParameter,
    setParameter,
    deleteParameter
  }
}
