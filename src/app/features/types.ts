import { ReactNode } from "react"

export type BusinessRules = Record<string, number>

export type ShapValues = Record<string, number>

export type BagData = {
  gebruiksdoelOmschrijvingen: string[]
  indicatie_geconstateerd?: boolean
  identificatie: string
  ligplaatsIdentificatie?: string
  ligplaatsStatusOmschrijving?: string
  toegangOmschrijvingen?: string[]
  verblijfsobjectAantalBouwlagen: number | null
  verblijfsobjectAantalKamers: number | null
  verblijfsobjectFeitelijkGebruikOmschrijving: string | null
  verblijfsobjectIdentificatie: string | null
  verblijfsobjectOppervlakte: number | null
  verblijfsobjectVerdiepingToegang: number | null
  verblijfsobjectStatusOmschrijving: string | null
  wozSoortObjectOmschrijving?: string | null
}

export type BagDataError = {
  error: string
}

export type BrkData = {
  results: {
    id: string
    cultuurcode_bebouwd?: {
      omschrijving?: string
    }
    rechten?: {
      id: string
      _display: string
    }[]
  }[]
  bag_id: string | null
}

export type BrkDataError = {
  error: string
}

export type Address = {
  bag_id: string | null
  id: number | null
  suffix_letter: string | null
  number: string
  postal_code: string
  street_name: string
  suffix: string | null
  lat: number | null
  lng: number | null
}

export type CaseWorkflowState = {
  name: string
}

export type CaseWorkflow = {
  state: CaseWorkflowState
}

export type CaseReason = {
  id: number | null
  name: string | null
  team: number | null
}

export type District = {
  id: number
  name: string
}

export type Case = {
  address: Address
  bag_data: BagData | BagDataError
  brk_data: BrkData | BrkDataError
  workflows: CaseWorkflow[]
  day_settings_id: number | null | undefined
  id: number | string
  reason: CaseReason
  schedules: any
  project: any
  subjects: any
  tags: any
  deleted: boolean
  teams?: Components.Schemas.ItineraryTeamMember[][]
  distance?: number
}

export type ItineraryItem = Omit<Components.Schemas.ItineraryItem, "case"> & {
  case: Omit<Components.Schemas.ItineraryItem["case"], "data"> & {
    data: Case
  }
}

export type Itinerary = Omit<Components.Schemas.Itinerary, "items"> & {
  items: ItineraryItem[]
}

type Value = string | ReactNode

export type KeyValueDetail = Value | [ string, Value ]

export type Severity = "INFO" | "WARNING" | "ERROR" | undefined

export type Project = {
  id: number
  name: string
}
