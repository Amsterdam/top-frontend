import useApiRequest from "./hooks/useApiRequest"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import currentDate from "../../features/shared/utils/currentDate"
import { Case, ItineraryItem, Itinerary } from "../../features/types"

export type ApiGroup =
  | "itineraries"
  | "users"
  | "settings"
  | "daySettings"
  | "teamSettings"
  | "teamSettingsList"
  | "postCodeRangesPresets"
  | "case"
  | "permits"
  | "auth"

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
    handleError
  })
}

export const useItineraryItems = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem[] }, { case_id: string, itinerary: number }>({
    ...options,
    url: makeGatewayUrl(["itinerary-items"]),
    groupName: "itineraries",
    handleError
  })
}

export const useItineraryItem = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem }, Partial<ItineraryItem>>({
    ...options,
    url: makeGatewayUrl(["itinerary-items", id]),
    groupName: "itineraries",
    handleError
  })
}

export const useItineraryItemNote = (id?: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.NoteCrud>({
    ...options,
    url: makeGatewayUrl(["notes", id]),
    groupName: "itineraries",
    handleError
  })
}


export const useOpenIssues = (itineraryId?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["cases", "unplanned"], { date: currentDate(), stadium: "Issuemelding", itinerary_id: itineraryId }),
    groupName: "itineraries",
    handleError
  })
}

export const useCase = (id: number|string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Case>({
    ...options,
    url: makeGatewayUrl(["cases", id]),
    groupName: "case",
    handleError
  })
}

export const useSearch = (streetNumber: number, postalCode?: string, streetName?: string, suffix?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["search"], { postalCode, streetName, streetNumber, suffix }),
    groupName: "itineraries",
    handleError
  })
}

export const useSuggestions = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl(["itineraries", itineraryId, "suggestions"]),
    groupName: "itineraries",
    handleError
  })
}

export const useUsers = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.User[] }>({
    ...options,
    url: makeGatewayUrl(["users"]),
    groupName: "users",
    handleError
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
    handleError
  })
}

export const useSettings = (options?: Options) => useApiRequest<Components.Schemas.PlannerSettings>({
    ...options,
    url: makeGatewayUrl(["settings", "planner"]),
    groupName: "settings"
  })

export const useTeamSettingsList = (options?: Options) => useApiRequest<{ results: Components.Schemas.TeamSettings[] }>({
    ...options,
    url: makeGatewayUrl(["team-settings"]),
    groupName: "teamSettingsList"
  })

export const useTeamSettings = (teamSettingsId: number, options?: Options) => useApiRequest<Components.Schemas.TeamSettings>({
    ...options,
    url: makeGatewayUrl(["team-settings", teamSettingsId]),
    groupName: "teamSettings"
  })

  export const useDaySettings = (daySettingsId: number, options?: Options) => useApiRequest<Components.Schemas.DaySettings>({
    ...options,
    url: makeGatewayUrl(["day-settings", daySettingsId]),
    groupName: "daySettings"
  })

  export const usePostCodeRanges = (options?: Options) => useApiRequest<{ results: Components.Schemas.PostalCodeRangePreset[] }>({
    ...options,
    url: makeGatewayUrl(["postal-code-ranges-presets"]),
    groupName: "postCodeRangesPresets"
  })

export const useDeleteItinerary = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{constants: string[]}>({
    ...options,
    url: makeGatewayUrl(["itineraries", id]),
    groupName: "itineraries",
    handleError
  })
}

export const useVisits = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[], Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl(["visits"]),
    groupName: "itineraries",
    handleError
  })
}

export const useSuggestNextVisit = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{results: Components.Schemas.SuggestNextVisit[]}>({
    ...options,
    url: makeGatewayUrl(["suggest-next-visit"]),
    groupName: "itineraries",
    handleError
  })
}

export const useObservations = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{results: Components.Schemas.Observation[]}>({
    ...options,
    url: makeGatewayUrl(["observations"]),
    groupName: "itineraries",
    handleError
  })
}

export const useVisit = (id: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl(["visits", id]),
    groupName: "itineraries",
    handleError
  })
}

export const useCaseVisits = (caseId: string|number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[]>({
    ...options,
    url: makeGatewayUrl(["cases", caseId, "visits"]),
    groupName: "itineraries",
    handleError
  })
}

export const usePermitCheckmarks = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PermitCheckmark>({
    ...options,
    url: makeGatewayUrl(["permits", "checkmarks"], { bag_id: bagId }),
    groupName: "permits",
    handleError
  })
}

export const usePermitDetails = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    ...options,
    url: makeGatewayUrl(["permits", "details"], { bag_id: bagId }),
    groupName: "permits",
    handleError
  })
}

/**
 * Please configure your endpoints here:
 * NOTE: For example "cases" and "cases/:id" share the same group config. Cache will be cleared for the whole group.
 */

export const useIsAuthorized = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<any>({
    ...options,
    url: makeGatewayUrl(["is-authorized"]),
    groupName: "auth",
    handleError
  })
}
