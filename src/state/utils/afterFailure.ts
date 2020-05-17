import isForbidden from "./isForbidden"
import handleForbiddenResponse from "../../lib/handleForbiddenResponse"
import { ResolvedRequest } from "globalstate-hooks"

export default (request: ResolvedRequest) => {
  if (isForbidden(request.status)) handleForbiddenResponse()
}
