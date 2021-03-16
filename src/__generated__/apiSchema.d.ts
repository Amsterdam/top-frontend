declare namespace Components {
    namespace Schemas {
        export type BlankEnum = "";
        export type Case = {
            readonly id: number
            case_id?: string | null
            readonly bwv_data: string
            readonly fraud_prediction: {
                fraud_probability: number // float
                fraud_prediction: boolean
                business_rules: {
                    [name: string]: any
                }
                shap_values: {
                    [name: string]: any
                }
                readonly sync_date: string // date-time
            }
        }
        export type CaseSimple = {
            case_id?: string | null
        }
        export type DaySettings = {
            readonly id: number
            name: string
            readonly week_day: null | number
            opening_date?: string // date
            postal_code_ranges?: {
                [name: string]: any
            }
            postal_code_ranges_presets?: number[]
            length_of_list?: number
            projects: number[]
            primary_stadium?: null | number
            secondary_stadia: number[]
            exclude_stadia: number[]
            readonly team_settings: {
                name: string
                use_zaken_backend?: boolean
                readonly observation_choices: Observation[]
                readonly situation_choices: any[]
                readonly suggest_next_visit_choices: SuggestNextVisit[]
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum
                readonly marked_stadia: StadiumLabel[]
                show_issuemelding?: boolean
                show_vakantieverhuur?: boolean
            }
            sia_presedence?: boolean
        }
        export type DaySettingsCompact = {
            readonly id: number
            name: string
            readonly week_day: number
            readonly team_settings: {
                name: string
                use_zaken_backend?: boolean
                readonly observation_choices: Observation[]
                readonly situation_choices: any[]
                readonly suggest_next_visit_choices: SuggestNextVisit[]
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum
                readonly marked_stadia: StadiumLabel[]
                show_issuemelding?: boolean
                show_vakantieverhuur?: boolean
            }
        }
        export type Decos = {
            permits: DecosPermit[]
            vakantieverhuur_meldingen: {
                rented_days_count: null | number
                planned_days_count: null | number
                is_rented_today: boolean
                meldingen: VakantieverhuurMelding[]
            } | null
        }
        export type DecosPermit = {
            permit_granted: HasVacationRentalPermitEnum
            permit_type: string
            decos_join_web_url?: string // uri ^(?:[a-z0-9.+-]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
            raw_data?: {
                [name: string]: any
            } | null
            details?: {
                [name: string]: any
            } | null
        }
        export type FraudPrediction = {
            fraud_probability: number // float
            fraud_prediction: boolean
            business_rules: {
                [name: string]: any
            }
            shap_values: {
                [name: string]: any
            }
            readonly sync_date: string // date-time
        }
        export type FraudPredictionModelEnum = "vakantieverhuur" | "onderhuur";
        export type HasVacationRentalPermitEnum = "True" | "False" | "UNKNOWN";
        export type Itinerary = {
            readonly id: number
            readonly created_at: string // date
            team_members: ItineraryTeamMember[]
            readonly items: ItineraryItem[]
            readonly settings: {
                opening_date: string // date
                day_settings: DaySettings
                target_length?: number
                projects: Project[]
                primary_stadium: Stadium
                secondary_stadia: Stadium[]
                exclude_stadia: Stadium[]
                start_case?: CaseSimple
            }
            readonly postal_code_settings: PostalCodeSettings[]
        }
        export type ItineraryItem = {
            readonly id: number
            position: number // float
            readonly notes: Note[]
            readonly case: {
                readonly id: number
                case_id?: string | null
                readonly bwv_data: string
                readonly fraud_prediction: {
                    fraud_probability: number // float
                    fraud_prediction: boolean
                    business_rules: {
                        [name: string]: any
                    }
                    shap_values: {
                        [name: string]: any
                    }
                    readonly sync_date: string // date-time
                }
            }
            readonly visits: Visit[]
        }
        export type ItinerarySettings = {
            opening_date: string // date
            day_settings: DaySettings
            target_length?: number
            projects: Project[]
            primary_stadium: Stadium
            secondary_stadia: Stadium[]
            exclude_stadia: Stadium[]
            start_case?: CaseSimple
        }
        export type ItineraryTeamMember = {
            readonly id: number
            readonly user: {
                id: string // uuid
                email: string // email
                username: string
                first_name: string
                last_name: string
                full_name: string
                team_settings: UserTeamSettingsId[]
            }
        }
        export type Note = {
            readonly id: number
            text: string
            readonly author: {
                id: string // uuid
                email: string // email
                username: string
                first_name: string
                last_name: string
                full_name: string
                team_settings: UserTeamSettingsId[]
            }
        }
        export type NoteCrud = {
            readonly id: number
            text: string
            itinerary_item: number
            readonly author: {
                id: string // uuid
                email: string // email
                username: string
                first_name: string
                last_name: string
                full_name: string
                team_settings: UserTeamSettingsId[]
            }
        }
        export type NullEnum = null;
        export type Observation = {
            value: string
            verbose: string
        }
        export type PaginatedCaseList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: Case[]
        }
        export type PaginatedDaySettingsList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: DaySettings[]
        }
        export type PaginatedItineraryList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: Itinerary[]
        }
        export type PaginatedObservationList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: Observation[]
        }
        export type PaginatedPostalCodeRangePresetList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: PostalCodeRangePreset[]
        }
        export type PaginatedSuggestNextVisitList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: SuggestNextVisit[]
        }
        export type PaginatedTeamSettingsList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: TeamSettings[]
        }
        export type PaginatedUserList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: User[]
        }
        export type PaginatedVisitList = {
            /**
             * example:
             * 123
             */
            count?: number
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null // uri
            results?: Visit[]
        }
        export type PatchedDaySettings = {
            readonly id?: number
            name?: string
            readonly week_day?: null | number
            opening_date?: string // date
            postal_code_ranges?: {
                [name: string]: any
            }
            postal_code_ranges_presets?: number[]
            length_of_list?: number
            projects?: number[]
            primary_stadium?: null | number
            secondary_stadia?: number[]
            exclude_stadia?: number[]
            readonly team_settings?: {
                name: string
                use_zaken_backend?: boolean
                readonly observation_choices: Observation[]
                readonly situation_choices: any[]
                readonly suggest_next_visit_choices: SuggestNextVisit[]
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum
                readonly marked_stadia: StadiumLabel[]
                show_issuemelding?: boolean
                show_vakantieverhuur?: boolean
            }
            sia_presedence?: boolean
        }
        export type PatchedItineraryItem = {
            readonly id?: number
            position?: number // float
            readonly notes?: Note[]
            readonly case?: {
                readonly id: number
                case_id?: string | null
                readonly bwv_data: string
                readonly fraud_prediction: {
                    fraud_probability: number // float
                    fraud_prediction: boolean
                    business_rules: {
                        [name: string]: any
                    }
                    shap_values: {
                        [name: string]: any
                    }
                    readonly sync_date: string // date-time
                }
            }
            readonly visits?: Visit[]
        }
        export type PatchedNoteCrud = {
            readonly id?: number
            text?: string
            itinerary_item?: number
            readonly author?: {
                id: string // uuid
                email: string // email
                username: string
                first_name: string
                last_name: string
                full_name: string
                team_settings: UserTeamSettingsId[]
            }
        }
        export type PatchedObservation = {
            value?: string
            verbose?: string
        }
        export type PatchedPostalCodeRangePreset = {
            readonly id?: number
            name?: string
            readonly postal_code_ranges_presets?: PostalCodeRange[]
        }
        export type PatchedSuggestNextVisit = {
            value?: string
            verbose?: string
        }
        export type PatchedTeamSettings = {
            readonly id?: number
            name?: string
            use_zaken_backend?: boolean
            readonly observation_choices?: Observation[]
            readonly situation_choices?: any[]
            readonly suggest_next_visit_choices?: SuggestNextVisit[]
            readonly project_choices?: string[]
            readonly stadia_choices?: string[]
            readonly marked_stadia?: StadiumLabel[]
            readonly day_settings_list?: DaySettingsCompact[]
        }
        export type PatchedVisit = {
            readonly id?: number
            readonly team_members?: VisitTeamMember[]
            situation?: string | null
            observations?: string[] | null
            start_time?: string // date-time
            description?: string | null
            can_next_visit_go_ahead?: boolean | null
            can_next_visit_go_ahead_description?: string | null
            suggest_next_visit?: string | null
            suggest_next_visit_description?: string | null
            personal_notes?: string | null
            case_id?: number
            itinerary_item?: null | number
            author?: string // uuid
        }
        export type PermitCheckmark = {
            has_b_and_b_permit: HasVacationRentalPermitEnum
            has_vacation_rental_permit: HasVacationRentalPermitEnum
        }
        export type PostalCodeRange = {
            range_start?: number
            range_end?: number
        }
        export type PostalCodeRangePreset = {
            readonly id: number
            name: string
            readonly postal_code_ranges_presets: PostalCodeRange[]
        }
        export type PostalCodeSettings = {
            range_start: number
            range_end: number
        }
        export type Project = {
            name: string
        }
        export type Stadium = {
            name: string
        }
        export type StadiumLabel = {
            readonly stadium: string
            label?: string
        }
        export type SuggestNextVisit = {
            value: string
            verbose: string
        }
        export type TeamSettings = {
            readonly id: number
            name: string
            use_zaken_backend?: boolean
            readonly observation_choices: Observation[]
            readonly situation_choices: any[]
            readonly suggest_next_visit_choices: SuggestNextVisit[]
            readonly project_choices: string[]
            readonly stadia_choices: string[]
            readonly marked_stadia: StadiumLabel[]
            readonly day_settings_list: DaySettingsCompact[]
        }
        export type TeamSettingsCompact = {
            name: string
            use_zaken_backend?: boolean
            readonly observation_choices: Observation[]
            readonly situation_choices: any[]
            readonly suggest_next_visit_choices: SuggestNextVisit[]
            fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum
            readonly marked_stadia: StadiumLabel[]
            show_issuemelding?: boolean
            show_vakantieverhuur?: boolean
        }
        export type User = {
            id: string // uuid
            email: string // email
            username: string
            first_name: string
            last_name: string
            full_name: string
            team_settings: UserTeamSettingsId[]
        }
        export type UserTeamSettingsId = {
            readonly id: number
        }
        export type VakantieverhuurMelding = {
            is_afmelding: boolean
            melding_date: string // date-time
            check_in_date: string // date-time
            check_out_date: string // date-time
        }
        export type VakantieverhuurRentalInformation = {
            rented_days_count: null | number
            planned_days_count: null | number
            is_rented_today: boolean
            meldingen: VakantieverhuurMelding[]
        }
        export type Visit = {
            readonly id: number
            readonly team_members: VisitTeamMember[]
            situation?: string | null
            observations?: string[] | null
            start_time: string // date-time
            description?: string | null
            can_next_visit_go_ahead?: boolean | null
            can_next_visit_go_ahead_description?: string | null
            suggest_next_visit?: string | null
            suggest_next_visit_description?: string | null
            personal_notes?: string | null
            case_id: number
            itinerary_item?: null | number
            author: string // uuid
        }
        export type VisitTeamMember = {
            readonly id: number
            readonly user: {
                id: string // uuid
                email: string // email
                username: string
                first_name: string
                last_name: string
                full_name: string
                team_settings: UserTeamSettingsId[]
            }
        }
    }
}
declare namespace Paths {
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace CasesUnplannedRetrieve {
        namespace Parameters {
            export type Date = string; // date
            export type Stadium = string;
        }
        export type QueryParameters = {
            date?: Parameters.Date /* date */
            stadium?: Parameters.Stadium
        }
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace CasesVisitsList {
        namespace Parameters {
            export type Id = string;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit[];
        }
    }
    namespace DaySettingsCreate {
        export type RequestBody = Components.Schemas.DaySettings;
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace DaySettingsList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDaySettingsList;
        }
    }
    namespace DaySettingsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedDaySettings;
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.DaySettings;
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DecosDetailsRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export type QueryParameters = {
            bag_id: Parameters.BagId
        }
        namespace Responses {
            export type $200 = Components.Schemas.Decos;
        }
    }
    namespace DecosTestConnectRetrieve {
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace FraudPredictionScoringCreate {
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace ItinerariesCreate {
        export type RequestBody = Components.Schemas.Itinerary;
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace ItinerariesList {
        namespace Parameters {
            export type CreatedAt = string;
            export type Page = number;
        }
        export type QueryParameters = {
            created_at?: Parameters.CreatedAt
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedItineraryList;
        }
    }
    namespace ItinerariesSuggestionsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.Itinerary;
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItineraryItemsCreate {
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
            export type $200 = Components.Schemas.ItineraryItem;
        }
    }
    namespace ItineraryItemsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace ItineraryItemsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedItineraryItem;
        namespace Responses {
            export type $200 = Components.Schemas.ItineraryItem;
        }
    }
    namespace ItineraryItemsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
            export type $200 = Components.Schemas.ItineraryItem;
        }
    }
    namespace NotesCreate {
        export type RequestBody = Components.Schemas.NoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace NotesPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedNoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.NoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace ObservationsCreate {
        export type RequestBody = Components.Schemas.Observation;
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace ObservationsList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedObservationList;
        }
    }
    namespace ObservationsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedObservation;
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.Observation;
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace PermitsCheckmarksRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export type QueryParameters = {
            bag_id: Parameters.BagId
        }
        namespace Responses {
            export type $200 = Components.Schemas.PermitCheckmark;
        }
    }
    namespace PermitsDetailsList {
        namespace Parameters {
            export type BagId = string;
        }
        export type QueryParameters = {
            bag_id: Parameters.BagId
        }
        namespace Responses {
            export type $200 = Components.Schemas.DecosPermit[];
        }
    }
    namespace PostalCodeRangesPresetsCreate {
        export type RequestBody = Components.Schemas.PostalCodeRangePreset;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace PostalCodeRangesPresetsList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedPostalCodeRangePresetList;
        }
    }
    namespace PostalCodeRangesPresetsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedPostalCodeRangePreset;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PostalCodeRangePreset;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace SearchList {
        namespace Parameters {
            export type Page = number;
            export type PostalCode = string;
            export type StreetName = string;
            export type StreetNumber = string;
            export type Suffix = string;
        }
        export type QueryParameters = {
            page?: Parameters.Page
            postalCode?: Parameters.PostalCode
            streetName?: Parameters.StreetName
            streetNumber?: Parameters.StreetNumber
            suffix?: Parameters.Suffix
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseList;
        }
    }
    namespace SuggestNextVisitCreate {
        export type RequestBody = Components.Schemas.SuggestNextVisit;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace SuggestNextVisitList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSuggestNextVisitList;
        }
    }
    namespace SuggestNextVisitPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedSuggestNextVisit;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.SuggestNextVisit;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace TeamSettingsCreate {
        export type RequestBody = Components.Schemas.TeamSettings;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace TeamSettingsList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedTeamSettingsList;
        }
    }
    namespace TeamSettingsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedTeamSettings;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.TeamSettings;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace UsersList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedUserList;
        }
    }
    namespace VisitsCreate {
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $204 = {
            }
        }
    }
    namespace VisitsList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedVisitList;
        }
    }
    namespace VisitsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedVisit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
}
