declare type Index = number

declare type UUID = string
declare type UUIDs = UUID[]
declare type Id = number
declare type OId = Id | undefined
declare type Ids = Id[]

declare type User = {
  id: UUID
  email: Email
  username: string
  first_name:	string
  last_name: string
  full_name: string
}
declare type Users = User[]

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
declare type Distance = number
declare type ShapValues = Record<string, number>
declare type BusinessRules = Record<string, number>
declare type FraudPrediction = {
  fraud_probability: number
  fraud_prediction: boolean
  business_rules: BusinessRules
  shap_values: ShapValues
}

declare type BWVData = {
  case_id: CaseId
  street_name: StreetName
  postal_code: PostalCode
  stadium: Stadium
  street_number: StreetNumber
  suffix: StreetSuffix | null
  suffix_letter: StreetSuffixLetter | null
  case_reason: string
  distance?: Distance
  teams?: TeamMembers[]
}

declare type Note = {
  id: Id
  itinerary_item: Id
  text: string
  author: User
}
declare type ONote = Note | undefined
declare type Notes = Note[]

declare type ItineraryPosition = number
declare type ItineraryItem = {
  id: Id
  case: {
    bwv_data: BWVData
    fraud_prediction: FraudPrediction
  }
  notes: Notes
  checked: boolean
  position: ItineraryPosition
}
declare type OItineraryItem = ItineraryItem | undefined
declare type ItineraryItems = ItineraryItem[]

declare type TeamMember = {
  id: Id
  user: User
}
declare type TeamMembers = TeamMember[]
declare type Itinerary = {
  id: Id
  created_at: string
  team_members: TeamMembers
  items: ItineraryItems
  settings: Settings
}
declare type OItinerary = Itinerary | undefined
declare type Itineraries = Itinerary[]

declare type SearchResultCase = BWVData & { fraud_prediction: FraudPrediction }
declare type SearchResultCases = SearchResultCase[]
declare type SearchResult = {
  success: boolean
  error?: string
  data?: {
    cases: SearchResultCases
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
  fraud_prediction: FraudPrediction | undefined
}
declare type Cases = Case[]

declare type List = {
  name: string
  id: number
  itineraries: BWVData[][]
}
declare type Lists = List[]
declare type PlanningData = {
  opening_date: string
  projects: string[]
  lists: Lists
  unplanned_cases: BWVData[]
}

declare type PlanningResult = {
  success: boolean
  error?: string
  data?: PlanningData
}

declare type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
declare type Days = Day[]

declare type DayPart = "day" | "evening"

declare type SettingsList = {
  name: string
  primary_stadium?: Stadium
  secondary_stadia?: Stadia
  exclude_stadia?: Stadia
}

// { monday: { evening: { name: '...',  primary_stadium: '...', ... } } }
declare type SettingsListMap = Record<Day, Record<DayPart, SettingsList>>

declare type Project = string
declare type Projects = Project[]

declare type PostalCodeRange = {
  range_start: string
  range_end: string
}

declare type PlanningSettings = {
  opening_date: string
  projects: Projects
  days: SettingsListMap
  postal_code: PostalCodeRange
}

declare type PlanningSettingsData = {
  projects: string[]
  stadia: Stadia
  settings: PlanningSettings
}
