import { queryString } from "./queryString"

/**
 * Immutable queryString manager for a single prop.
 * Because its immutable you can use it safely within a hook.
 *
 * @see `useQueryStringProp`
 */

export const queryStringProp = (qs: ReturnType<typeof queryString>, param: string) => {
  const get = () => qs.getParameter(param)

  const exists = () => qs.hasParameter(param)

  const del = () =>
    queryStringProp(qs.deleteParameter(param), param)

  const set = (value: string) =>
    queryStringProp(qs.setParameter(param, value), param)

  return {
    getUrl: qs.getUrl,
    navigateToUrl: qs.navigateToUrl,
    get,
    set,
    exists,
    del
  }
}
