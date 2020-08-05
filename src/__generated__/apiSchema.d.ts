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
        export type Itinerary = {
            readonly id: number
            readonly created_at: string // date
            team_members: ItineraryTeamMember[]
            readonly items: ItineraryItem[]
            readonly settings: {
                opening_date: string // date
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
                readonly fraud_prediction: any
            }
            checked?: boolean
        }
        export type ItinerarySettings = {
            opening_date: string // date
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
            }
        }
        export type Name352Enum = "Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra";
        export type NameF0aEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding";
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
            }
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
            }
        }
        export type PatchedVisit = {
            readonly id?: number
            start_time?: string // date-time
            description?: string | null
            nobody_present?: boolean | null
            suggest_next_visit_day?: boolean | null
            suggest_next_visit_evening?: boolean | null
            suggest_next_visit_weekend?: boolean | null
            suggest_next_visit_unknown?: boolean | null
            suggest_discontinue_case?: boolean | null
            no_cooperation?: boolean | null
            no_cooperation_malfunctioning_doorbell?: boolean | null
            no_cooperation_video_call?: boolean | null
            no_cooperation_hotel_furnished?: boolean | null
            no_cooperation_vacant?: boolean | null
            no_cooperation_likely_inhabited?: boolean | null
            cooperation?: boolean | null
            cooperation_likely_fraud?: boolean | null
            itinerary_item?: number
            author?: string // uuid
        }
        export type PlannerDaySettings = {
            day?: PlannerListSettings
            evening?: PlannerListSettings
        }
        export type PlannerListSettings = {
            length_of_list?: number
            primary_stadium?: PrimaryStadiumEnum
            secondary_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding")[]
            exclude_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding")[]
        }
        export type PlannerPostalCodeSettings = {
            range_start: number
            range_end: number
        }
        export type PlannerSettings = {
            opening_date: string // date
            projects: ("Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra")[]
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
        export type PostalCodeSettings = {
            range_start: number
            range_end: number
        }
        export type PrimaryStadiumEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding";
        export type Project = {
            name: Name352Enum
        }
        export type Stadium = {
            name: NameF0aEnum
        }
        export type User = {
            id: string // uuid
            email: string // email
            username: string
            first_name: string
            last_name: string
            full_name: string
        }
        export type UserId = {
            id: string // uuid
            readonly email: string // email
            readonly username: string
            readonly first_name: string
            readonly last_name: string
            full_name: string
        }
        export type Visit = {
            readonly id: number
            start_time: string // date-time
            description?: string | null
            nobody_present?: boolean | null
            suggest_next_visit_day?: boolean | null
            suggest_next_visit_evening?: boolean | null
            suggest_next_visit_weekend?: boolean | null
            suggest_next_visit_unknown?: boolean | null
            suggest_discontinue_case?: boolean | null
            no_cooperation?: boolean | null
            no_cooperation_malfunctioning_doorbell?: boolean | null
            no_cooperation_video_call?: boolean | null
            no_cooperation_hotel_furnished?: boolean | null
            no_cooperation_vacant?: boolean | null
            no_cooperation_likely_inhabited?: boolean | null
            cooperation?: boolean | null
            cooperation_likely_fraud?: boolean | null
            itinerary_item: number
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
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
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
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace ConstantsProjectsList {
        namespace Responses {
            export type $200 = {
                [name: string]: any
            }[];
        }
    }
    namespace ConstantsStadiaList {
        namespace Responses {
            export type $200 = {
                [name: string]: any
            }[];
        }
    }
    namespace FraudPredictionScoringCreate {
        /**
         * Unspecified request body
         */
        export type RequestBody = {
            [name: string]: any
        }
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace IsAuthenticatedRetrieve {
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
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
            export type CreatedAt = string;
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        export type QueryParameters = {
            created_at?: Parameters.CreatedAt
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
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: Components.Schemas.Itinerary[]
            }
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
        /**
         * Unspecified request body
         */
        export type RequestBody = {
            [name: string]: any
        }
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
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
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
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
        /**
         * Unspecified request body
         */
        export type RequestBody = {
            [name: string]: any
        }
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace ItineraryItemsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export type PathParameters = {
            id: Parameters.Id
        }
        /**
         * Unspecified request body
         */
        export type RequestBody = {
            [name: string]: any
        }
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
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
    namespace OidcAuthenticateCreate {
        /**
         * Unspecified request body
         */
        export type RequestBody = {
            [name: string]: any
        }
        namespace Responses {
            /**
             * Unspecified response body
             */
            export type $200 = {
                [name: string]: any
            }
        }
    }
    namespace SchemaRetrieve {
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
            export type StreetNumber = string;
            export type Suffix = string;
        }
        export type QueryParameters = {
            page?: Parameters.Page
            postalCode?: Parameters.PostalCode
            streetNumber?: Parameters.StreetNumber
            suffix?: Parameters.Suffix
        }
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: Components.Schemas.Case[]
            }
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
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: Components.Schemas.PlannerSettings[]
            }
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
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: Components.Schemas.User[]
            }
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
            export type $200 = {
                /**
                 * example:
                 * 123
                 */
                count?: number
                next?: string | null
                previous?: string | null
                results?: Components.Schemas.Visit[]
            }
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
