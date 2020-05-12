import { useQueryStringProp } from "./useQueryStringProp"

const DEFAULT_ID: string = "1"

export const useQueryStringModal = (prop: string) => {
  const queryStringProp = useQueryStringProp(prop)

  const shouldShow = queryStringProp
    .exists()

  const id = queryStringProp
    .get()

  const getUrl = (id: string = DEFAULT_ID) =>
    queryStringProp
      .set(id)
      .getUrl()

  const handleClose = () =>
    queryStringProp
      .del()
      .navigateToUrl()

  return {
    id,
    shouldShow,
    handleClose,
    getUrl
  }
}
