import useApiRequest from "./hooks/useApiRequest"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import currentDate from "../../features/shared/utils/currentDate"
import { Case, Itinerary, ItineraryItem } from "app/features/types"

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
    url: makeGatewayUrl([ "itineraries" ], { created_at: currentDate() }),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useItineraryItems = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem[] }, { case_id: string, itinerary: number }>({
    ...options,
    url: makeGatewayUrl([ "itinerary-items" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useItineraryItem = (id: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ itineraries: ItineraryItem }, Partial<ItineraryItem>>({
    ...options,
    url: makeGatewayUrl([ "itinerary-items", id ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useItineraryItemNote = (id?: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.NoteCrud>({
    ...options,
    url: makeGatewayUrl([ "notes", id ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useOpenIssues = (itineraryId?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl([ "cases", "unplanned" ], {
      date: currentDate(),
      stadium: "Issuemelding",
      itinerary_id: itineraryId
    }),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useCase = (id: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Case>({
    ...options,
    url: makeGatewayUrl([ "cases", id ]),
    groupName: "case",
    handleError,
    isProtected: true
  })
}

export const useSearch = (streetNumber: number, postalCode?: string, streetName?: string, suffix?: string, options?: Options) => {
  const handleError = useErrorHandler()

  // Remove all spaces from postal code to match format requested by API.
  // Trim streetName and suffix to forgive a user typing accidental spaces.
  const params = {
    postalCode: postalCode?.replace(/\s+/g, ""),
    streetName: streetName?.trim(),
    streetNumber,
    suffix: suffix?.trim()
  }

  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl([ "search" ], params),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useSuggestions = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl([ "itineraries", itineraryId, "suggestions" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useUsers = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.User[] }>({
    ...options,
    url: makeGatewayUrl([ "users" ]),
    groupName: "users",
    handleError,
    isProtected: true
  })
}

export const useTeam = (itineraryId: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.User[] },
    { team_members: { user: Components.Schemas.User }[] }>({
    ...options,
    url: makeGatewayUrl([ "itineraries", itineraryId, "team" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useTeamSettingsList = (options?: Options) => useApiRequest<{ results: Components.Schemas.TeamSettings[] }>({
  ...options,
  url: makeGatewayUrl([ "team-settings" ]),
  groupName: "teamSettingsList",
  isProtected: true
})

export const useTeamSettings = (teamSettingsId: number, options?: Options) => useApiRequest<Components.Schemas.TeamSettings>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useDaySettings = (daySettingsId: number, options?: Options) => useApiRequest<Components.Schemas.DaySettings>({
  ...options,
  url: makeGatewayUrl([ "day-settings", daySettingsId ]),
  groupName: "daySettings",
  isProtected: true
})

export const usePostCodeRanges = (options?: Options) => useApiRequest<{ results: Components.Schemas.PostalCodeRangePreset[] }>({
  ...options,
  url: makeGatewayUrl([ "postal-code-ranges-presets" ]),
  groupName: "postCodeRangesPresets",
  isProtected: true
})

export const useDeleteItinerary = (id: string | number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ constants: string[] }>({
    ...options,
    url: makeGatewayUrl([ "itineraries", id ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useVisits = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[], Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl([ "visits" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useSuggestNextVisit = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.SuggestNextVisit[] }>({
    ...options,
    url: makeGatewayUrl([ "suggest-next-visit" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useObservations = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ results: Components.Schemas.Observation[] }>({
    ...options,
    url: makeGatewayUrl([ "observations" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useVisit = (id: string | number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl([ "visits", id ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const useCaseVisits = (caseId: string | number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit[]>({
    ...options,
    url: makeGatewayUrl([ "cases", caseId, "visits" ]),
    groupName: "itineraries",
    handleError,
    isProtected: true
  })
}

export const usePermitCheckmarks = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PermitCheckmark>({
    ...options,
    url: makeGatewayUrl([ "permits", "checkmarks" ], { bag_id: bagId }),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}

export type booleanString = "True" | "False" | "UNKNOWN"

export type allPermitCheckmarks = {
  has_b_and_b_permit: booleanString
  has_ligplaats_permit: booleanString
  has_omzettings_permit: booleanString
  has_splitsing_permit: booleanString
  has_vacation_rental_permit: booleanString
  has_ontrekking_vorming_samenvoeging_permit: booleanString
}
export type permitType = {
  permit_granted: booleanString
  permit_type: string
  date_from: string
  decos_join_web_url: string
  raw_data: any
  details: any
}

export const useAllPermitCheckmarks = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<permitType[]>({
    ...options,
    url: makeGatewayUrl([ "all-permits", "details" ], { bag_id: bagId }),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}

export const usePermitDetails = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    ...options,
    url: makeGatewayUrl([ "permits", "details" ], { bag_id: bagId }),
    groupName: "permits",
    handleError,
    isProtected: true
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
    url: makeGatewayUrl([ "is-authorized" ]),
    groupName: "auth",
    handleError,
    isProtected: true
  })
}
