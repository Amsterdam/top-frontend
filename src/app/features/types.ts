import { ReactNode } from "react"

export type BusinessRules = Record<string, number>

export type ShapValues = Record<string, number>

export type FraudPrediction = {
  business_rules: BusinessRules
  fraud_prediction: boolean
  fraud_probability: number
  shap_values: ShapValues
}

export type BagData = {
  aanduiding_in_onderzoek?: boolean
  aantal_kamers: number | null
  bouwlagen: number | null
  gebruik: string | null
  gebruiksdoel: string[]
  indicatie_geconstateerd?: boolean
  ligplaatsidentificatie?: string
  oppervlakte: number | null
  status: string
  verblijfsobjectidentificatie: string | null
  verdieping_toegang: number | null
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
  fraud_prediction: FraudPrediction | undefined
  id: number | string
  reason: CaseReason
  schedules: any
  project: any
  subjects: any
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

