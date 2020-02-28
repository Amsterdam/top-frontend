declare type Index = number
declare type ItineraryPosition = number

declare type Id = number
declare type OId = Id | undefined
declare type Ids = Id[]

declare type CaseId = string
declare type CaseIds = CaseId[]

declare type StreetName = string
declare type StreetNumber = number
declare type StreetNumberString = string
declare type StreetSuffix = string
declare type StreetSuffixLetter = string
declare type Address = [StreetName, StreetNumber, StreetSuffix | undefined]
declare type PostalCode = string
declare type Stadium = string
declare type Stadia = Stadium[]

declare type BWVData = {
  case_id: CaseId
  street_name: StreetName
  postal_code: PostalCode
  stadium: Stadium
  street_number: StreetNumber
  suffix: StreetSuffix | null
  suffix_letter: StreetSuffixLetter | null
  case_reason: string
}
declare type Note = {
  id: Id
  itinerary_item: Id
  text: string
}
declare type ONote = Note | undefined
declare type Notes = Note[]
declare type Itinerary = {
  id: Id
  case: {
    bwv_data: BWVData
  }
  notes: Notes
  position: ItineraryPosition
}
declare type OItinerary = Itinerary | undefined
declare type Itineraries = Itinerary[]

declare type SearchResult = {
  success: boolean
  error?: string
  data?: {
    cases: BWVData[]
  }
}
declare type SearchResults = SearchResult[]

type ImportAdres = {
  sttnaam: string
  hsnr: string
  toev: string | null
  hsltr: string | null
  postcode: string
}
type BWVPersoon = {
  naam: string
  voorletters: string
  geslacht: "M" | "V"
  geboortedatum: string
  overlijdensdatum: string
  vestigingsdatum_adres: string
}
type BWVPersonen = BWVPersoon[]
type BWVTmp = {
  case_number: string | null
  num_cases: string | null
  num_open_cases: number | null
  openings_reden: string | null
}
type VakantieVerhuur = {
  notified_rentals: [{ check_in: string, check_out: string }]
  rented_days: number
  shortstay: "J" | "N"
  is_bnb_declared: "J" | "N"
}
declare type BagData = {
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
declare type BagDataError = {
  error: string
}
declare type BrkData = {
  owners: { _display: string }[]
}
declare type BrkDataError = {
  error: string
}
type BWVHotlineMelding = {
  melding_datum: string
  melding_anoniem: "J" | "N"
  melder_naam: string
  melder_telnr: string
  situatie_schets: string
}
type BWVHotlineBevinding = {
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
type ImportStadia = {
  sta_oms: string
  begindatum: string
  einddatum: string
  peildatum: string
  sta_nr: string
}
type RelatedCase = {
  case_number: string
  case_id: string
  case_reason: string
}
type Statement = {
  user: string
  date: string
  statement: string
}
declare type Case = {
  bag_data: BagData | BagDataError
  brk_data: BrkData | BrkDataError
  import_adres: ImportAdres
  bwv_hotline_bevinding: BWVHotlineBevinding[]
  bwv_tmp: BWVTmp
  bwv_hotline_melding: BWVHotlineMelding[]
  bwv_personen: BWVPersonen
  import_stadia: ImportStadia[]
  vakantie_verhuur: VakantieVerhuur
  related_cases: RelatedCase[]
  statements: Statement[]
}
declare type Cases = Case[]

declare type List = {
  name: string
  number_of_lists: number
  length_of_lists: number
  id: number
  itineraries: BWVData[][]
}
declare type Lists = List[]
declare type PlanningData = {
  opening_date: string
  opening_reasons: string[]
  lists: Lists
  unplanned_cases: BWVData[]
}

declare type PlanningResult = {
  success: boolean
  error?: string
  data?: PlanningData
}

declare type PlanningSettingsData = any
