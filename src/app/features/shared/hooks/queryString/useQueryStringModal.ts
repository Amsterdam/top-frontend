import { useQueryStringProp } from "./useQueryStringProp"

const DEFAULT_ID: string = "1"

/**
 * ```
 *  const {
 *
 *    id,            // Returns the value of the queryString-param.
 *    shouldShow,    // Is queryString parameter set? If so: show modal
 *    handleClose,   // Deletes the queryString-parameter, effectively switching the 'shouldShow' boolean
 *    getUrl         // Use `getUrl(id?)` to generate a URL, when that URL is active the modal will open.
 *
 *  } = useQueryStringModal('modal.foo')
 *  ```
 */

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
