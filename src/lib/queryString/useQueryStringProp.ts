import { queryStringProp } from "./queryStringProp"
import { useQueryString } from "./useQueryString"

export const useQueryStringProp = (prop: string) => {
  const editor = useQueryString()
  return queryStringProp(editor, prop)
}
