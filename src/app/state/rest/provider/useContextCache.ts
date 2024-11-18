import { useCallback, useContext } from "react"
import { ApiContext } from "./ApiProvider"

type GroupName = "itineraries"

/*
 ** Hook for getting and updating items in the Context.
 ** GroupName and urlKey are defined in the hook where the useApiRequest hook is called.

    EXAMPLE:
    export const useSuggestions = (itineraryId: number, options?: Options) => {
      const handleError = useErrorHandler()
      return useApiRequest<{ cases: Case[] }>({
        ...options,
        url: makeGatewayUrl([ "itineraries", itineraryId, "suggestions" ]),
        groupName: "suggestions",
        handleError,
        isProtected: true
      })
    }

    CORRECT:
    const { getContextItem, updateContextItem } = useContextCache("suggestions", makeGatewayUrl([ "itineraries", itineraryId, "suggestions" ]))
*/

const useContextCache = (groupName: GroupName, apiUrl: string) => {
  const contextGroup = useContext(ApiContext)[groupName]
  const item = contextGroup.getCacheItem(apiUrl)?.value

  const getContextItem = useCallback(() => item, [item])
  const updateContextItem = useCallback((updatedItem: any) =>
    contextGroup.updateCacheItem(apiUrl, () => updatedItem), [contextGroup, apiUrl]
  )
  const clearContextCache = useCallback(() => contextGroup.clearCache(), [ contextGroup ])

  return { getContextItem, updateContextItem, clearContextCache }
}

export default useContextCache
