import { ApiCache } from "../hooks/useApiCache"
import { RequestQueue } from "../hooks/useRequestQueue"

const noopUndefined = () => undefined
const noopBoolean = () => false

export const noopContext: ApiCache & RequestQueue = {
  isRequestPendingInQueue: noopBoolean,
  pushRequestInQueue: noopUndefined,
  getCacheItem: () => ({ valid: false, value: undefined, errors: []}),
  setCacheItem: noopUndefined,
  updateCacheItem: noopUndefined,
  addErrorToCacheItem: noopUndefined,
  clearCache: noopUndefined
}
