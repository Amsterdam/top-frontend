import authToken from "../../lib/authToken"
import { RequestHeaders } from "globalstate-hooks"

const token = authToken.get()
const headers: RequestHeaders = token !== undefined ? { Authorization: `Bearer ${ token }` } : {}
export default headers
