import dayjs from "dayjs"
import type { HolidayRentalRegistration, Permit, PermitType } from "@amsterdam/wonen-ui"
import useApiRequest from "./hooks/useApiRequest"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import currentDate from "../../features/shared/utils/currentDate"
import { Case, Itinerary, ItineraryItem, District } from "app/features/types"

export type ApiGroup =
  | "auth"
  | "case"
  | "daySettings"
  | "decos"
  | "itineraries"
  | "toeristischeverhuur"
  | "permits"
  | "postCodeRangesPresets"
  | "settings"
  | "teamSettings"
  | "themes"
  | "users"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  caseCount?: boolean
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
  return useApiRequest<{ itineraries: ItineraryItem[] }, { id: number | string, itinerary: number }>({
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

export const useCaseEvents = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseProjectList>({
    ...options,
    url: makeGatewayUrl(["cases", caseId, "events"]),
    groupName: "case",
    handleError,
    isProtected: true
  })
}

export const useResidents = (bagId: string, options?: Options) => useApiRequest<any>({
    ...options,
    url: makeGatewayUrl(["addresses", bagId, "residents"]),
    groupName: "case",
    isProtected: true,
    noForbiddenRedirect: true
  })

export const useSearch = (streetNumber: number, postalCode?: string, streetName?: string, suffix?: string, team?: number, options?: Options) => {
  const handleError = useErrorHandler()

  // Remove all spaces from postal code to match format requested by API.
  // Trim streetName and suffix to forgive a user typing accidental spaces.
  const params = {
    postalCode: postalCode?.replace(/\s+/g, ""),
    streetName: streetName?.trim(),
    streetNumber,
    suffix: suffix?.trim(),
    theme: team
  }

  return useApiRequest<{ cases: Case[] }>({
    ...options,
    url: makeGatewayUrl([ "search" ], params),
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

export const useThemes = (options?: Options) => (
  useApiRequest<{ results: Components.Schemas.TeamSettingsTheme[] }>({
    ...options,
    url: makeGatewayUrl([ "themes" ]),
    groupName: "themes",
    isProtected: true
  })
)

export const useTeamSettings = (teamSettingsId: string, options?: Options) => useApiRequest<Components.Schemas.TeamSettings>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useTeamSettingsReasons = (teamSettingsId: string, options?: Options) => useApiRequest<Components.Schemas.CaseReason[]>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId, "reasons" ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useTeamSettingsScheduleTypes = (teamSettingsId: string, options?: Options) => useApiRequest<Components.Schemas.TeamScheduleTypes>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId, "schedule-types" ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useTeamSettingsStateTypes = (teamSettingsId: string, options?: Options) => useApiRequest<Components.Schemas.CaseStateType[]>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId, "state-types" ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useTeamSettingsProjects = (teamSettingsId: string, options?: Options) => useApiRequest<Components.Schemas.CaseReason[]>({
  ...options,
  url: makeGatewayUrl([ "team-settings", teamSettingsId, "case-projects" ]),
  groupName: "teamSettings",
  isProtected: true
})

export const useTeamSettingsSubjects = (teamSettingsId: string, options?: Options) => (
  useApiRequest<Components.Schemas.CaseSubject[]>({
    ...options,
    url: makeGatewayUrl([ "team-settings", teamSettingsId, "subjects" ]),
    groupName: "teamSettings",
    isProtected: true
  })
)

export const useTeamSettingsTags = (teamSettingsId: string, options?: Options) => (
  useApiRequest<Components.Schemas.CaseTag[]>({
    ...options,
    url: makeGatewayUrl([ "team-settings", teamSettingsId, "tags" ]),
    groupName: "teamSettings",
    isProtected: true
  })
)

export const useCorporations = (options?: Options) => useApiRequest<Components.Schemas.HousingCorporation[]>({
  ...options,
  url: makeGatewayUrl([ "addresses/housing-corporations" ], {}),
  groupName: "teamSettings",
  isProtected: true
})

export const useDaySettingsList = (options?: Options) => useApiRequest<Components.Schemas.DaySettings[]>({
  ...options,
  url: makeGatewayUrl([ "day-settings" ], {}),
  groupName: "teamSettings",
  isProtected: true
})

export const useDaySettings = (daySettingsId: string, options?: Options) => {
  const params: any = {}
  if (options?.caseCount) {
    params["case-count"] = true
  }
  return useApiRequest<Components.Schemas.DaySettings>({
    ...options,
    url: makeGatewayUrl([ "day-settings", daySettingsId ], params),
    groupName: "teamSettings",
    isProtected: true
  })
}

export const useDistricts = (options?: Options) => useApiRequest<District[]>({
  ...options,
  url: makeGatewayUrl([ "addresses", "districts" ]),
  groupName: "teamSettings",
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

export const useVisit = (id: string, options?: Options) => {
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

export type booleanString = "True" | "False" | "UNKNOWN"

export type decosType = {
  permits: Permit[]
}

export const useDecos = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<decosType>({
    ...options,
    url: makeGatewayUrl([ "addresses", bagId, "decos" ]),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}

// PowerBrowser permits for B&B
export const usePowerBrowser = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<PermitType[]>({
    ...options,
    url: makeGatewayUrl([ "addresses", bagId, "permits-powerbrowser" ]),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}

export const useMeldingen = (bagId: string, options?: Options) => {
  const params: any = {
    start_date: dayjs().subtract(1, "years").startOf("year").format()
  }

  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Meldingen>({
    ...options,
    url: makeGatewayUrl([ "addresses", bagId, "meldingen" ], params),
    groupName: "toeristischeverhuur",
    handleError,
    isProtected: true
  })
}

export const useRegistrations = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<HolidayRentalRegistration[]>({
    ...options,
    url: makeGatewayUrl([ "addresses", bagId, "registrations" ]),
    groupName: "toeristischeverhuur",
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
