import { ReactNode } from "react"

export type BusinessRules = Record<string, number>
export type ShapValues = Record<string, number>

export type FraudPrediction = {
  fraud_probability: number
  fraud_prediction: boolean
  business_rules: BusinessRules
  shap_values: ShapValues
}

export type BagData = {
  gebruiksdoel: string[]
  gebruik: string | null
  bouwlagen: number | null
  aantal_kamers: number | null
  oppervlakte: number | null
  verblijfsobjectidentificatie: string | null
  verdieping_toegang: number | null
  status: string
  ligplaatsidentificatie?: string
  indicatie_geconstateerd?: boolean
  aanduiding_in_onderzoek?: boolean
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

type ImportAdres = {
  sttnaam: string
  hsnr: string
  toev: string | null
  hsltr: string | null
  postcode: string
}

export type BWVHotlineBevinding = {
  toez_hdr1_code: string
  toez_hdr2_code: string
  toez_hdr1_naam: string
  toez_hdr2_naam: string
  bevinding_datum: string
  bevinding_tijd: string
  hit: "J" | "N"
  opmerking: string | null
  volgnr_bevinding: string
}

type BWVTmp = {
  case_number: string | null
  num_cases: string | null
  num_open_cases: number | null
  openings_reden: string | null
}

type BWVHotlineMelding = {
  melding_datum: string
  melding_anoniem: "J" | "N"
  melder_naam: string
  melder_telnr: string
  situatie_schets: string
}

type BWVPersoon = {
  naam: string
  voorletters: string
  geslacht: "M" | "V"
  geboortedatum: string
  overlijdensdatum: string
  vestigingsdatum_adres: string
}

type ImportStadia = {
  sta_oms: string
  begindatum: string
  einddatum: string
  peildatum: string
  sta_nr: string
}

type VakantieVerhuur = {
  notified_rentals: [{ check_in: string, check_out: string }]
  rented_days: number
  shortstay: "J" | "N"
  is_bnb_declared: "J" | "N"
}

export type RelatedCase = {
  case_number: string
  case_id: string
  case_reason: string
}

type Statement = {
  user: string
  date: string
  statement: string
}

export type BWVData = {
  case_id: string
  street_name: string
  postal_code: string
  stadium: Components.Schemas.Stadium["name"]
  street_number: number
  suffix: string | null
  suffix_letter: string | null
  case_reason: string
  distance?: number
  teams?: Components.Schemas.ItineraryTeamMember[]
  is_sia: boolean
}

export type Case = {
  bag_data: BagData | BagDataError
  brk_data: BrkData | BrkDataError
  import_adres: ImportAdres
  bwv_hotline_bevinding: BWVHotlineBevinding[]
  bwv_tmp: BWVTmp
  bwv_hotline_melding: BWVHotlineMelding[]
  bwv_personen: BWVPersoon[]
  import_stadia: ImportStadia[]
  vakantie_verhuur: VakantieVerhuur
  related_cases: RelatedCase[]
  statements: Statement[]
  fraud_prediction: FraudPrediction | undefined
  day_settings_id: number | null | undefined
  is_sia: string
}

export type ItineraryItem = Omit<Components.Schemas.ItineraryItem, "case"> & {
  case: Omit<Components.Schemas.ItineraryItem["case"], "bwv_data"> & {
    bwv_data: BWVData
  }
}
export type Itinerary = Omit<Components.Schemas.Itinerary, "items"> & {
  items: ItineraryItem[]
}

type Value = string | ReactNode
export type KeyValueDetail = Value | [string, Value]

export type Severity = "INFO" | "WARNING" | "ERROR" | undefined
