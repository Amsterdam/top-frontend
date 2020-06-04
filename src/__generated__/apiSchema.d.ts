declare namespace API {
    export type Case = {
        readonly id?: number
        case_id?: string | null
        readonly bwv_data?: string
        readonly fraud_prediction?: {
            fraud_probability: number // float
            fraud_prediction: boolean
            business_rules: {
                [name: string]: any
            }
            shap_values: {
                [name: string]: any
            }
            readonly sync_date?: string // date-time
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
        readonly sync_date?: string // date-time
    }
    export type Itinerary = {
        readonly id?: number
        readonly created_at?: string // date
        team_members: API.ItineraryTeamMember[]
        readonly items?: API.ItineraryItem[]
        readonly settings?: {
            opening_date: string // date
            target_length?: number
            projects: API.Project[]
            primary_stadium: API.Stadium
            secondary_stadia: API.Stadium[]
            exclude_stadia: API.Stadium[]
            start_case?: API.CaseSimple
            postal_code_range_start?: null | number
            postal_code_range_end?: null | number
        }
    }
    export type ItineraryItem = {
        readonly id?: number
        position: number // float
        readonly notes?: API.Note[]
        readonly case?: {
            readonly id?: number
            case_id?: string | null
            readonly bwv_data?: string
            readonly fraud_prediction?: {
                fraud_probability: number // float
                fraud_prediction: boolean
                business_rules: {
                    [name: string]: any
                }
                shap_values: {
                    [name: string]: any
                }
                readonly sync_date?: string // date-time
            }
        }
        checked?: boolean
    }
    export type ItinerarySettings = {
        opening_date: string // date
        target_length?: number
        projects: API.Project[]
        primary_stadium: API.Stadium
        secondary_stadia: API.Stadium[]
        exclude_stadia: API.Stadium[]
        start_case?: API.CaseSimple
        postal_code_range_start?: null | number
        postal_code_range_end?: null | number
    }
    export type ItineraryTeamMember = {
        readonly id?: number
        readonly user?: {
            id: string // uuid
            readonly email?: string // email
            readonly username?: string
            readonly first_name?: string
            readonly last_name?: string
            full_name: string
        }
    }
    export type Note = {
        readonly id?: number
        text: string
        readonly author?: {
            id: string // uuid
            email: string // email
            username: string
            first_name: string
            last_name: string
            full_name: string
        }
    }
    export type NoteCrud = {
        readonly id?: number
        text: string
        itinerary_item: number
        readonly author?: {
            id: string // uuid
            email: string // email
            username: string
            first_name: string
            last_name: string
            full_name: string
        }
    }
    namespace Parameters {
        export type CreatedAt = string;
        export type Date = string; // date
        export type Id = number;
        export type Page = number;
        export type PostalCode = string;
        export type Stadium = string;
        export type StreetNumber = string;
        export type Suffix = string;
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
    export type PathParameters = {
        id: API.Parameters.Id
    }
    export type PlannerDaySettings = {
        day?: API.PlannerListSettings
        evening?: API.PlannerListSettings
    }
    export type PlannerListSettings = {
        length_of_list?: number
        primary_stadium?: API.PrimaryStadiumEnum
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
        postal_code?: API.PlannerPostalCodeSettings
        days: API.PlannerWeekSettings
    }
    export type PlannerWeekSettings = {
        monday: API.PlannerDaySettings
        tuesday: API.PlannerDaySettings
        wednesday: API.PlannerDaySettings
        thursday: API.PlannerDaySettings
        friday: API.PlannerDaySettings
        saturday: API.PlannerDaySettings
        sunday: API.PlannerDaySettings
    }
    export type PrimaryStadiumEnum = "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding";
    export type Project = {
        name: "Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra"
    }
    export type QueryParameters = {
        page?: API.Parameters.Page
    }
    export type RequestBody = API.PlannerSettings;
    namespace Responses {
        export type $200 = {
            /**
             * example:
             * 123
             */
            count?: number
            next?: string | null
            previous?: string | null
            results?: API.User[]
        }
    }
    export type Stadium = {
        name: "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding"
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
        readonly email?: string // email
        readonly username?: string
        readonly first_name?: string
        readonly last_name?: string
        full_name: string
    }
}
