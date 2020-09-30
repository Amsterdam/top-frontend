import useApiRequest from "./hooks/useApiRequest"
import { getHeaders, makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import currentDate from "../../features/shared/utils/currentDate"
import { Case, ItineraryItem, Itinerary } from "../../features/types"

export type ApiGroup =
  | "itineraries"
  | "users"
  | "settings"
  | "constants"
  | "case"
  | "permits"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
}

/**
 * Please configure your endpoints here:
 */

export const useItineraries = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: Itinerary[] }>({
    ...options,
    url: makeGatewayUrl(["itineraries"], { created_at: currentDate() }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItems = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem[] }, { case_id: string, itinerary: number }>({
    ...options,
    url: makeGatewayUrl(["itinerary-items"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItem = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem }, Partial<ItineraryItem>>({
    ...options,
    url: makeGatewayUrl(["itinerary-items", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItemNote = (id?: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.NoteCrud>({
    ...options,
    url: makeGatewayUrl(["notes", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}


export const useOpenIssues = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["cases", "unplanned"], { date: currentDate(), stadium: "Issuemelding" }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useCase = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Case>({
    ...options,
    url: makeGatewayUrl(["cases", id]),
    groupName: "case",
    handleError,
    getHeaders
  })
}

export const useSearch = (streetNumber: number, postalCode?: string, streetName?: string, suffix?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["search"], { postalCode, streetName, streetNumber, suffix }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useSuggestions = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["itineraries", itineraryId, "suggestions"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useUsers = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.User[] }>({
    ...options,
    url: makeGatewayUrl(["users"]),
    groupName: "users",
    handleError,
    getHeaders
  })
}

export const useTeam = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<
    { results: Components.Schemas.User[] },
    { team_members: { user: Components.Schemas.User }[] }
  >({
    ...options,
    url: makeGatewayUrl(["itineraries", itineraryId, "team"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useSettings = (options?: Options) => useApiRequest<Components.Schemas.PlannerSettings>({
    ...options,
    url: makeGatewayUrl(["settings", "planner"]),
    groupName: "settings",
    getHeaders
  })

export const useProjectConstants = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    ...options,
    url: makeGatewayUrl(["constants", "projects"]),
    groupName: "constants",
    handleError,
    getHeaders
  })
}

export const useStadiaConstants = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    ...options,
    url: makeGatewayUrl(["constants", "stadia"]),
    groupName: "constants",
    handleError,
    getHeaders
  })
}

export const useDeleteItinerary = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    ...options,
    url: makeGatewayUrl(["itineraries", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useVisits = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[], Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl(["visits"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useVisit = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl(["visits", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useCaseVisits = (caseId: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[]>({
    ...options,
    url: makeGatewayUrl(["cases", caseId, "visits"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const usePermitCheckmarks = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PermitCheckmark>({
    ...options,
    url: makeGatewayUrl(["permits", "checkmarks"], { bag_id: bagId }),
    groupName: "permits",
    handleError,
    getHeaders
  })
}

export const usePermitDetails = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    ...options,
    url: makeGatewayUrl(["permits", "details"], { bag_id: bagId }),
    groupName: "permits",
    handleError,
    getHeaders
  })
}
