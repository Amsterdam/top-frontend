import authToken from "../../lib/authToken"
import { RequestHeaders } from "globalstate-hooks"

export default () => {
  const token = authToken.get()
  const headers = token !== undefined ? { Authorization: `Bearer ${ token }` } : {}
  return headers as RequestHeaders
}
