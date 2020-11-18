declare namespace Components {
    namespace Schemas {
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
        export type DecosPermit = {
            permit_granted?: boolean
            permit_type?: "BED_AND_BREAKFAST" | "VAKANTIEVERHUUR" | "PERMIT_UNKNOWN"
            processed: string | null
            date_from: string | null // date
            date_to?: string | null // date
            decos_join_web_url?: string // uri ^(?:[a-z0-9.+-]*)://(?:[^\s:@/]+(?::[^\s:@/]*)?@)?(?:(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}|\[[0-9a-f:.]+\]|([a-z¡-￿0-9](?:[a-z¡-￿0-9-]{0,61}[a-z¡-￿0-9])?(?:\.(?!-)[a-z¡-￿0-9-]{1,63}(?<!-))*\.(?!-)(?:[a-z¡-￿-]{2,63}|xn--[a-z0-9]{1,59})(?<!-)\.?|localhost))(?::\d{2,5})?(?:[/?#][^\s]*)?\Z
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
        export type HasBAndBPermitEnum = "True" | "False" | "UNKNOWN";
        export type HasVacationRentalPermitEnum = "True" | "False" | "UNKNOWN";
        export type Itinerary = {
            readonly id: number
            readonly created_at: string // date
            team_members: ItineraryTeamMember[]
            readonly items: ItineraryItem[]
            readonly settings: {
                opening_date: string // date
                team_settings: TeamSettings
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
            team_settings: TeamSettings
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
                readonly email: string // email
                readonly username: string
                readonly first_name: string
                readonly last_name: string
                full_name: string
                team_settings: TeamSettingsId[]
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
                team_settings: TeamSettingsId[]
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
                team_settings: TeamSettingsId[]
            }
        }
        export type OIDCAuthenticate = {
            code: string
        }
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
        export type PaginatedPlannerSettingsList = {
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
            results?: PlannerSettings[]
        }
        export type PaginatedPostalCodeRangeSetList = {
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
            results?: PostalCodeRangeSet[]
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
                team_settings: TeamSettingsId[]
            }
        }
        export type PatchedObservation = {
            value?: string
            verbose?: string
        }
        export type PatchedPostalCodeRangeSet = {
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
            readonly team_type?: {
                [name: string]: any
            }
            readonly observation_choices?: Observation[]
            readonly situation_choices?: any[]
            readonly suggest_next_visit_choices?: SuggestNextVisit[]
            readonly project_choices?: string[]
            readonly stadia_choices?: string[]
            readonly marked_stadia?: StadiumLabel[]
            settings?: {
                [name: string]: any
            }
        }
        export type PatchedVisit = {
            readonly id?: number
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
            has_b_and_b_permit: HasBAndBPermitEnum
            has_vacation_rental_permit: HasVacationRentalPermitEnum
        }
        export type PermitTypeEnum = "BED_AND_BREAKFAST" | "VAKANTIEVERHUUR" | "PERMIT_UNKNOWN";
        export type PlannerDaySettings = {
            day?: PlannerListSettings
            evening?: PlannerListSettings
        }
        export type PlannerListSettings = {
            length_of_list?: number
            primary_stadium?: string
            secondary_stadia?: any[]
            exclude_stadia?: any[]
        }
        export type PlannerPostalCodeSettings = {
            range_start: number
            range_end: number
        }
        export type PlannerSettings = {
            opening_date: string // date
            projects: any[]
            postal_codes?: PlannerPostalCodeSettings[]
            days: PlannerWeekSettings
        }
        export type PlannerWeekSettings = {
            monday: PlannerDaySettings
            tuesday: PlannerDaySettings
            wednesday: PlannerDaySettings
            thursday: PlannerDaySettings
            friday: PlannerDaySettings
            saturday: PlannerDaySettings
            sunday: PlannerDaySettings
        }
        export type PostalCodeRange = {
            range_start?: number
            range_end?: number
        }
        export type PostalCodeRangeSet = {
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
            readonly team_type: {
                [name: string]: any
            }
            readonly observation_choices: Observation[]
            readonly situation_choices: any[]
            readonly suggest_next_visit_choices: SuggestNextVisit[]
            readonly project_choices: string[]
            readonly stadia_choices: string[]
            readonly marked_stadia: StadiumLabel[]
            settings: {
                [name: string]: any
            }
        }
        export type TeamSettingsId = {
            readonly id: number
            readonly team_type: {
                [name: string]: any
            }
        }
        export type User = {
            id: string // uuid
            email: string // email
            username: string
            first_name: string
            last_name: string
            full_name: string
            team_settings: TeamSettingsId[]
        }
        export type UserId = {
            id: string // uuid
            readonly email: string // email
            readonly username: string
            readonly first_name: string
            readonly last_name: string
            full_name: string
            team_settings: TeamSettingsId[]
        }
        export type Visit = {
            readonly id: number
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
    namespace FraudPredictionScoringCreate {
        namespace Responses {
            export type $200 = {
            }
        }
    }
    namespace IsAuthenticatedRetrieve {
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
    namespace OidcAuthenticateCreate {
        export type RequestBody = Components.Schemas.OIDCAuthenticate;
        namespace Responses {
            export type $200 = Components.Schemas.OIDCAuthenticate;
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
    namespace PostalCodeRangesCreate {
        export type RequestBody = Components.Schemas.PostalCodeRangeSet;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangeSet;
        }
    }
    namespace PostalCodeRangesDestroy {
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
    namespace PostalCodeRangesList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedPostalCodeRangeSetList;
        }
    }
    namespace PostalCodeRangesPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PatchedPostalCodeRangeSet;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangeSet;
        }
    }
    namespace PostalCodeRangesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangeSet;
        }
    }
    namespace PostalCodeRangesUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type RequestBody = Components.Schemas.PostalCodeRangeSet;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangeSet;
        }
    }
    namespace SchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
        }
        export type QueryParameters = {
            format?: Parameters.Format
        }
        namespace Responses {
            export type $200 = {
                [name: string]: any
            }
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
    namespace SettingsPlannerCreate {
        export type RequestBody = Components.Schemas.PlannerSettings;
        namespace Responses {
            export type $200 = Components.Schemas.PlannerSettings;
        }
    }
    namespace SettingsPlannerList {
        namespace Parameters {
            export type Page = number;
        }
        export type QueryParameters = {
            page?: Parameters.Page
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedPlannerSettingsList;
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
