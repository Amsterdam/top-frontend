declare namespace Components {
    namespace Schemas {
        export type Case = {
            readonly id: number
            case_id?: string | null
            readonly bwv_data: string
            readonly fraud_prediction: {
                fraud_probability: number; // float
                fraud_prediction: boolean;
                business_rules: {
                    [name: string]: any;
                };
                shap_values: {
                    [name: string]: any;
                };
                readonly sync_date: string; // date-time
            };
        }
        export interface CaseSimple {
            case_id?: string | null;
        }
        export type DecosPermit = {
            permit_granted?: boolean
            permit_type?: "BED_AND_BREAKFAST" | "VAKANTIEVERHUUR" | "PERMIT_UNKNOWN"
            processed: string | null
            date_from: string | null // date
            date_to?: string | null // date
        }
        export type FraudPrediction = {
            fraud_probability: number // float
            fraud_prediction: boolean
            business_rules: {
                [name: string]: any;
            };
            shap_values: {
                [name: string]: any;
            };
            readonly sync_date: string; // date-time
        }
        export type HasBAndBPermitEnum = "True" | "False" | "UNKNOWN";
        export type HasVacationRentalPermitEnum = "True" | "False" | "UNKNOWN";
        export type Itinerary = {
            readonly id: number
            readonly created_at: string // date
            team_members: ItineraryTeamMember[]
            readonly items: ItineraryItem[]
            readonly settings: {
                opening_date: string; // date
                team_settings: TeamSettingsModel;
                target_length?: number;
                projects: Project[];
                primary_stadium: Stadium;
                secondary_stadia: Stadium[];
                exclude_stadia: Stadium[];
                start_case?: CaseSimple;
            };
            readonly postal_code_settings: PostalCodeSettings[];
        }
        export interface ItineraryItem {
            readonly id: number;
            position: number; // float
            readonly notes: Note[];
            readonly case: {
                readonly id: number
                case_id?: string | null
                readonly bwv_data: string
                readonly fraud_prediction: any
            }
            readonly visits: Visit[]
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
                id: string; // uuid
                readonly email: string; // email
                readonly username: string;
                readonly first_name: string;
                readonly last_name: string;
                full_name: string;
                readonly team_settings: TeamSettingsId[];
                readonly current_team_settings_id: number;
                
            };
        }
        export type Name2d6Enum = "Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra";
        export type Name95fEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding";
        export type Note = {
            readonly id: number
            text: string
            readonly author: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: TeamSettingsId[];
            };
        }
        export interface NoteCrud {
            readonly id: number;
            text: string;
            itinerary_item: number;
            readonly author: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: TeamSettingsId[];
            };
        }
<<<<<<< HEAD
        export type OIDCAuthenticate = {
            code: string
        }
        export type PatchedItineraryItem = {
            readonly id?: number
            position?: number // float
            readonly notes?: Note[]
            readonly case?: {
                readonly id: number
                case_id?: string | null
                readonly bwv_data: string
                readonly fraud_prediction: any
            }
            readonly visits?: Visit[]
            checked?: boolean
        }
        export type PatchedNoteCrud = {
            readonly id?: number
            text?: string
            itinerary_item?: number
            readonly author?: {
<<<<<<< HEAD
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
            situation?: "nobody_present" | "no_cooperation" | "access_granted"
            observations?: string[] | null
            start_time?: string // date-time
            description?: string | null
            can_next_visit_go_ahead?: boolean | null
            can_next_visit_go_ahead_description?: string | null
            suggest_next_visit?: "weekend" | "daytime" | "evening" | "unknown"
            suggest_next_visit_description?: string | null
            personal_notes?: string | null
            itinerary_item?: number
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
=======
=======
        export interface PatchedNoteCrud {
            readonly id?: number;
            text?: string;
            itinerary_item?: number;
            readonly author?: {
>>>>>>> feat: team settings update
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: TeamSettingsId[];
            };
        }
        export interface PatchedTeamSettingsModel {
            readonly id?: number;
            name?: string;
            team_type?: string;
            settings?: {
                [name: string]: any;
            };
        }
        export interface PatchedVisit {
            readonly id?: number;
            situation?: "nobody_present" | "no_cooperation" | "access_granted";
            observations?: string[] | null;
            start_time?: string; // date-time
            description?: string | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: "weekend" | "daytime" | "evening" | "unknown";
            suggest_next_visit_description?: string | null;
            personal_notes?: string | null;
            itinerary_item?: number;
            author?: string; // uuid
        }
        export interface PlannerDaySettings {
            day?: PlannerListSettings;
            evening?: PlannerListSettings;
        }
        export interface PlannerListSettings {
            length_of_list?: number;
            primary_stadium?: PrimaryStadiumEnum;
            secondary_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding" | "ZL Corporatie" | "Crimineel gebruik woning")[];
            exclude_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding" | "ZL Corporatie" | "Crimineel gebruik woning")[];
        }
        export interface PlannerPostalCodeSettings {
            range_start: number;
            range_end: number;
        }
        export interface PlannerSettings {
            opening_date: string; // date
            projects: ("Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra" | "ZKL Doorverhuur" | "Combi BI Doorpak" | "Combi BI Melding" | "Combi Doorpak" | "Combi Overbewoning" | "Combi Samenwoners" | "Combi_ZKL_Doorpak" | "Combi_ZKL_Melding")[];
            postal_codes?: PlannerPostalCodeSettings[];
            days: PlannerWeekSettings;
        }
        export interface PlannerWeekSettings {
            monday: PlannerDaySettings;
            tuesday: PlannerDaySettings;
            wednesday: PlannerDaySettings;
            thursday: PlannerDaySettings;
            friday: PlannerDaySettings;
            saturday: PlannerDaySettings;
            sunday: PlannerDaySettings;
        }
        export interface PostalCodeSettings {
            range_start: number;
            range_end: number;
        }
<<<<<<< HEAD
        export type PrimaryStadiumEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding";
<<<<<<< HEAD
        export type Project = {
            name: Name2d6Enum
        }
        export type SituationEnum = "nobody_present" | "no_cooperation" | "access_granted";
        export type Stadium = {
            name: Name95fEnum
=======
=======
        export type PrimaryStadiumEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding" | "ZL Corporatie" | "Crimineel gebruik woning";
>>>>>>> feat: team settings used for 'genereer looplijst'
        export interface Project {
            name: NameA4dEnum;
        }
        export type SituationEnum = "nobody_present" | "no_cooperation" | "access_granted";
        export interface Stadium {
<<<<<<< HEAD
            name: NameF0aEnum;
>>>>>>> feat: team settings update
=======
            name: Name093Enum;
>>>>>>> feat: team settings used for 'genereer looplijst'
        }
        export type SuggestNextVisitEnum = "weekend" | "daytime" | "evening" | "unknown";
        export interface TeamSettingsId {
            readonly id: number;
            team_type?: string;
        }
        export interface TeamSettingsModel {
            readonly id: number;
            name: string;
            projects: string[],
            stadia: string[],
            team_type?: any;
            settings: PlannerSettings;
        }
        export interface User {
            id: string; // uuid
            email: string; // email
            username: string;
            first_name: string;
            last_name: string;
            full_name: string;
            team_settings: TeamSettingsId[];
            current_team_settings_id: number;
        }
        export interface UserId {
            id: string; // uuid
            readonly email: string; // email
            readonly username: string;
            readonly first_name: string;
            readonly last_name: string;
            full_name: string;
        }
        export interface Visit {
            readonly id: number;
            situation?: "nobody_present" | "no_cooperation" | "access_granted";
            observations?: string[] | null;
            start_time: string; // date-time
            description?: string | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: "weekend" | "daytime" | "evening" | "unknown";
            suggest_next_visit_description?: string | null;
            personal_notes?: string | null;
            itinerary_item: number;
            author: string; // uuid
        }
<<<<<<< HEAD
=======
        /**
         * Serializer for Visit many-to-one relation but with start_time added
         */
        export interface VisitRelated {
            readonly id: number;
            start_time: string; // date-time
        }
>>>>>>> feat: team settings update
    }
}
declare namespace Paths {
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CasesUnplannedRetrieve {
        namespace Parameters {
            export type Date = string; // date
            export type Stadium = string;
        }
        export interface QueryParameters {
            date?: Parameters.Date /* date */;
            stadium?: Parameters.Stadium;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CasesVisitsList {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit[];
        }
    }
    namespace ConstantsProjectsRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ConstantsStadiaRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace FraudPredictionScoringCreate {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace IsAuthenticatedRetrieve {
        namespace Responses {
            export interface $200 {
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
        export interface PathParameters {
            id: Parameters.Id;
        }
<<<<<<< HEAD
=======
        export interface QueryParameters {
            created_at?: Parameters.CreatedAt;
        }
>>>>>>> feat: team settings update
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ItinerariesList {
        namespace Parameters {
            export type CreatedAt = string;
            export type Page = number;
        }
        export interface QueryParameters {
            created_at?: Parameters.CreatedAt;
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.Itinerary[];
            }
        }
    }
    namespace ItinerariesSuggestionsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Itinerary;
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItineraryItemsCreate {
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
<<<<<<< HEAD
            export type $200 = Components.Schemas.ItineraryItem;
=======
            export interface $200 {
            }
>>>>>>> feat: team settings update
        }
    }
    namespace ItineraryItemsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ItineraryItemsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedItineraryItem;
        namespace Responses {
<<<<<<< HEAD
            export type $200 = Components.Schemas.ItineraryItem;
=======
            export interface $200 {
            }
>>>>>>> feat: team settings update
        }
    }
    namespace ItineraryItemsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
<<<<<<< HEAD
            export type $200 = Components.Schemas.ItineraryItem;
=======
            export interface $200 {
            }
>>>>>>> feat: team settings update
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
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace NotesPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
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
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.NoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace OidcAuthenticateCreate {
        export type RequestBody = Components.Schemas.OIDCAuthenticate;
        namespace Responses {
<<<<<<< HEAD
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
=======
            export interface $200 {
            }
>>>>>>> feat: team settings update
        }
    }
    namespace SchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
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
        export interface QueryParameters {
            page?: Parameters.Page;
            postalCode?: Parameters.PostalCode;
            streetNumber?: Parameters.StreetNumber;
            suffix?: Parameters.Suffix;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.Case[];
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
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.PlannerSettings[];
            }
        }
    }
    namespace SettingsTeamCreate {
        export type RequestBody = Components.Schemas.TeamSettingsModel;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettingsModel;
        }
    }
    namespace SettingsTeamDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace SettingsTeamList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.TeamSettingsModel[];
            }
        }
    }
    namespace SettingsTeamPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedTeamSettingsModel;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettingsModel;
        }
    }
    namespace SettingsTeamRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettingsModel;
        }
    }
    namespace SettingsTeamUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.TeamSettingsModel;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettingsModel;
        }
    }
    namespace UsersList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.User[];
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
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace VisitsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                next?: string | null;
                previous?: string | null;
                results?: Components.Schemas.Visit[];
            }
        }
    }
    namespace VisitsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
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
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
}
