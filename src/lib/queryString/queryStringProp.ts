import { queryString } from "./queryString"

export const queryStringProp = (editor: ReturnType<typeof queryString>, param: string) => {
  const get = () => editor.getParameter(param)

  const exists = () => editor.hasParameter(param)

  const del = () =>
    queryStringProp(editor.deleteParameter(param), param)

  const set = (value: string) =>
    queryStringProp(editor.setParameter(param, value), param)

  return {
    getUrl: editor.getUrl,
    navigateToUrl: editor.navigateToUrl,
    get,
    set,
    exists,
    del
  }
}
