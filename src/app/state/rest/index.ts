import useApiRequest from "./hooks/useApiRequest"
import { getHeaders, makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import currentDate from "../../features/shared/utils/currentDate"
import { Case, ItineraryItem } from "../../features/types"

export type ApiGroup =
  | "itineraries"
  | "users"
  | "settings"
  | "constants"
  | "case"

type Options = {
  lazy?: boolean
}

/**
 * Please configure your endpoints here:
 */

export const useItineraries = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: Components.Schemas.Itinerary[] }>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["itineraries"], { created_at: currentDate() }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItems = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem[] }, { case_id: string, itinerary: number }>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["itinerary-items"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItem = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem }, Partial<Components.Schemas.ItineraryItem>>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["itinerary-items", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useItineraryItemNote = (id?: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.NoteCrud>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["notes", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}


export const useOpenIssues = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["cases", "unplanned"], { date: currentDate(), stadium: "Issuemelding" }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useCase = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Case>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["cases", id]),
    groupName: "case",
    handleError,
    getHeaders
  })
}

export const useSearch = (postalCode: string, streetNumber: number, suffix?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["search"], { postalCode, streetNumber, suffix }),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useSuggestions = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["itineraries", itineraryId, "suggestions"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useUsers = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.User[] }>({
    lazy: options?.lazy,
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
    lazy: options?.lazy,
    url: makeGatewayUrl(["itineraries", itineraryId, "team"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useSettings = (options?: Options) => useApiRequest<Components.Schemas.PlannerSettings>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["settings", "planner"]),
    groupName: "settings",
    getHeaders
  })

export const useProjectConstants = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["constants", "projects"]),
    groupName: "constants",
    handleError,
    getHeaders
  })
}

export const useStadiaConstants = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    url: makeGatewayUrl(["constants", "stadia"]),
    groupName: "constants",
    handleError,
    getHeaders
  })
}

export const useDeleteItinerary = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["itineraries", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useVisits = (options?: Options) => {
  const handleError = useErrorHandler()
  // TODO type return type
  return useApiRequest<any>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["visits"]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}

export const useVisit = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  // TODO type return type
  return useApiRequest<any>({
    lazy: options?.lazy,
    url: makeGatewayUrl(["visits", id]),
    groupName: "itineraries",
    handleError,
    getHeaders
  })
}


