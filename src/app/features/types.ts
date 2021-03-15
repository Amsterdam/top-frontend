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
  bag_id: string | null
  owners: { _display: string }[]
}

export type BrkDataError = {
  error: string
}

export type Address = {
  suffix_letter: string | null
  number: string
  postal_code: string
  street_name: string
  suffix: string | null
}

export type BWVHotlineBevinding = {
  bevinding_datum: string
  bevinding_tijd: string
  hit: "J" | "N"
  opmerking: string | null
  toez_hdr1_code: string
  toez_hdr1_naam: string
  toez_hdr2_code: string
  toez_hdr2_naam: string
  volgnr_bevinding: string
}

type BWVTmp = {
  case_number: string | null
  num_cases: string | null
  num_open_cases: number | null
  openings_reden: string | null
}

type BWVHotlineMelding = {
  melder_naam: string
  melder_telnr: string
  melding_anoniem: "J" | "N"
  melding_datum: string
  situatie_schets: string
}

export type BWVPersoon = {
  geboortedatum: string
  geslacht: "M" | "V"
  naam: string
  overlijdensdatum: string
  vestigingsdatum_adres: string
  voorletters: string
}

type ImportStadia = {
  begindatum: string
  einddatum: string
  peildatum: string
  sta_nr: string
  sta_oms: string
}

type VakantieVerhuur = {
  is_bnb_declared: "J" | "N"
  notified_rentals: [ { check_in: string, check_out: string } ]
  rented_days: number
  shortstay: "J" | "N"
}

export type RelatedCase = {
  case_id: string
  case_number: string
  case_reason: string
}

type Statement = {
  date: string
  statement: string
  user: string
}

export type BWVData = {
  case_id: string
  case_reason: string
  distance?: number
  is_sia: string
  postal_code: string
  stadium: Components.Schemas.Stadium["name"]
  street_name: string
  street_number: number
  suffix: string | null
  suffix_letter: string | null
  teams?: Components.Schemas.ItineraryTeamMember[]
}

export type Case = {
  bag_data: BagData | BagDataError
  brk_data: BrkData | BrkDataError
  bwv_hotline_bevinding: BWVHotlineBevinding[]
  bwv_hotline_melding: BWVHotlineMelding[]
  bwv_personen: BWVPersoon[]
  bwv_tmp: BWVTmp
  day_settings_id: number | null | undefined
  fraud_prediction: FraudPrediction | undefined
  address: Address
  import_stadia: ImportStadia[]
  is_sia: string
  related_cases: RelatedCase[]
  statements: Statement[]
  vakantie_verhuur: VakantieVerhuur
}

export type ItineraryItem = Omit<Components.Schemas.ItineraryItem, "case"> & {
  case: Omit<Components.Schemas.ItineraryItem["case"], "data"> & {
    data: BWVData
  }
}

export type Itinerary = Omit<Components.Schemas.Itinerary, "items"> & {
  items: ItineraryItem[]
}

type Value = string | ReactNode

export type KeyValueDetail = Value | [ string, Value ]

export type Severity = "INFO" | "WARNING" | "ERROR" | undefined
