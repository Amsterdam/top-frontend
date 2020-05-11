declare namespace API {
    /**
     * Case
     */
    export type Case = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Case id
         */
        case_id?: string
        /**
         * Bwv data
         */
        readonly bwv_data?: string
        fraud_prediction?: API.FraudPrediction
    }
    /**
     * Start case
     */
    export type CaseSimple = {
        /**
         * Case id
         */
        case_id?: string
    }
    /**
     * Fraud prediction
     */
    export type FraudPrediction = {
        /**
         * Fraud probability
         */
        fraud_probability: number
        /**
         * Fraud prediction
         */
        fraud_prediction: boolean
        /**
         * Business rules
         */
        business_rules: {
        }
        /**
         * Shap values
         */
        shap_values: {
        }
        /**
         * Sync date
         */
        readonly sync_date?: string // date-time
    }
    namespace ItinerariesCreate {
        export type BodyParameters = {
            data: API.ItinerariesCreate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.Itinerary;
        }
        namespace Responses {
            export type $201 = API.Itinerary;
        }
    }
    namespace ItinerariesList {
        namespace Responses {
            export type $200 = {
                count: number
                next?: string // uri
                previous?: string // uri
                results: API.Itinerary[]
            }
        }
    }
    namespace ItinerariesSuggestions {
        namespace Responses {
            export type $200 = API.Itinerary;
        }
    }
    namespace ItinerariesTeamRead {
        namespace Responses {
            export type $200 = API.Itinerary;
        }
    }
    namespace ItinerariesTeamUpdate {
        export type BodyParameters = {
            data: API.ItinerariesTeamUpdate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.Itinerary;
        }
        namespace Responses {
            export type $200 = API.Itinerary;
        }
    }
    export type Itinerary = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Created at
         */
        readonly created_at?: string // date
        team_members: API.ItineraryTeamMember[]
        readonly items?: API.ItineraryItem[]
        settings?: API.ItinerarySettings
    }
    export type ItineraryItem = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Position
         */
        position: number
        readonly notes?: API.Note[]
        case?: API.Case
        /**
         * Checked
         */
        checked?: boolean
    }
    export type ItineraryItemCreate = {
        /**
         * Itinerary
         */
        itinerary: number
        /**
         * Case id
         */
        case_id: string
        /**
         * Position
         */
        position?: number
    }
    export type ItineraryItemUpdate = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Position
         */
        position?: number
        /**
         * Checked
         */
        checked?: boolean
    }
    namespace ItineraryItemsCreate {
        export type BodyParameters = {
            data: API.ItineraryItemsCreate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.ItineraryItemCreate;
        }
        namespace Responses {
            export type $201 = API.ItineraryItemCreate;
        }
    }
    namespace ItineraryItemsPartialUpdate {
        export type BodyParameters = {
            data: API.ItineraryItemsPartialUpdate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.ItineraryItemUpdate;
        }
        namespace Responses {
            export type $200 = API.ItineraryItemUpdate;
        }
    }
    namespace ItineraryItemsUpdate {
        export type BodyParameters = {
            data: API.ItineraryItemsUpdate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.ItineraryItemUpdate;
        }
        namespace Responses {
            export type $200 = API.ItineraryItemUpdate;
        }
    }
    /**
     * Settings
     */
    export type ItinerarySettings = {
        /**
         * Opening date
         */
        opening_date: string // date
        /**
         * Target length
         */
        target_length?: number
        projects: API.Project[]
        primary_stadium: API.Stadium
        secondary_stadia: API.Stadium[]
        exclude_stadia: API.Stadium[]
        start_case?: API.CaseSimple
        /**
         * Postal code range start
         */
        postal_code_range_start?: number
        /**
         * Postal code range end
         */
        postal_code_range_end?: number
    }
    export type ItineraryTeamMember = {
        /**
         * ID
         */
        readonly id?: number
        user?: API.UserId
    }
    export type Note = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Text
         */
        text: string
        author?: API.User
    }
    export type NoteCrud = {
        /**
         * ID
         */
        readonly id?: number
        /**
         * Text
         */
        text: string
        /**
         * Itinerary item
         */
        itinerary_item: number
        author?: API.User
    }
    namespace NotesCreate {
        export type BodyParameters = {
            data: API.NotesCreate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.NoteCrud;
        }
        namespace Responses {
            export type $201 = API.NoteCrud;
        }
    }
    namespace NotesPartialUpdate {
        export type BodyParameters = {
            data: API.NotesPartialUpdate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.NoteCrud;
        }
        namespace Responses {
            export type $200 = API.NoteCrud;
        }
    }
    namespace NotesRead {
        namespace Responses {
            export type $200 = API.NoteCrud;
        }
    }
    namespace NotesUpdate {
        export type BodyParameters = {
            data: API.NotesUpdate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.NoteCrud;
        }
        namespace Responses {
            export type $200 = API.NoteCrud;
        }
    }
    /**
     * Monday
     */
    export type PlannerDaySettings = {
        day?: API.PlannerListSettings
        evening?: API.PlannerListSettings
    }
    /**
     * Day
     */
    export type PlannerListSettings = {
        /**
         * Length of list
         */
        length_of_list?: number
        /**
         * Primary stadium
         */
        primary_stadium?: "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding"
        secondary_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding")[]
        exclude_stadia?: ("Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding")[]
    }
    /**
     * Postal code
     */
    export type PlannerPostalCodeSettings = {
        /**
         * Range start
         */
        range_start: number
        /**
         * Range end
         */
        range_end: number
    }
    export type PlannerSettings = {
        /**
         * Opening date
         */
        opening_date: string // date
        projects: ("Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra")[]
        postal_code?: API.PlannerPostalCodeSettings
        days: API.PlannerWeekSettings
    }
    /**
     * Days
     */
    export type PlannerWeekSettings = {
        monday: API.PlannerDaySettings
        tuesday: API.PlannerDaySettings
        wednesday: API.PlannerDaySettings
        thursday: API.PlannerDaySettings
        friday: API.PlannerDaySettings
        saturday: API.PlannerDaySettings
        sunday: API.PlannerDaySettings
    }
    export type Project = {
        /**
         * Name
         */
        name: "Bed en breakfast 2019" | "Burgwallenproject Oudezijde" | "Corpo-rico" | "Digital toezicht Safari" | "Digital toezicht Zebra" | "Haarlemmerbuurt" | "Hotline" | "Mystery Guest" | "Project Andes" | "Project Jordaan" | "Project Lobith" | "Project Sahara" | "Safari" | "Safari 2015" | "Sahara Adams Suites" | "Sahara hele woning" | "Sahara meer dan 4" | "Sahara Recensies" | "Sahara veel adv" | "Social Media 2019" | "Woonschip (woonboot)" | "Zebra"
    }
    namespace SearchList {
        namespace Responses {
            export type $200 = {
                count: number
                next?: string // uri
                previous?: string // uri
                results: API.Case[]
            }
        }
    }
    namespace SettingsPlannerCreate {
        export type BodyParameters = {
            data: API.SettingsPlannerCreate.Parameters.Data
        }
        namespace Parameters {
            export type Data = API.PlannerSettings;
        }
        namespace Responses {
            export type $201 = API.PlannerSettings;
        }
    }
    namespace SettingsPlannerList {
        namespace Responses {
            export type $200 = {
                count: number
                next?: string // uri
                previous?: string // uri
                results: API.PlannerSettings[]
            }
        }
    }
    /**
     * Primary stadium
     */
    export type Stadium = {
        /**
         * Name
         */
        name: "Onderzoek buitendienst" | "2de Controle" | "3de Controle" | "Hercontrole" | "2de hercontrole" | "3de hercontrole" | "Avondronde" | "Onderzoek advertentie" | "Weekend buitendienstonderzoek" | "Issuemelding"
    }
    /**
     * Author
     */
    export type User = {
        /**
         * Id
         */
        id: string // uuid
        /**
         * Email
         */
        email: string // email
        /**
         * Username
         */
        username: string
        /**
         * First name
         */
        first_name: string
        /**
         * Last name
         */
        last_name: string
        /**
         * Full name
         */
        full_name: string
    }
    /**
     * User
     */
    export type UserId = {
        /**
         * Id
         */
        id: string // uuid
        /**
         * Email
         */
        readonly email?: string // email
        /**
         * Username
         */
        readonly username?: string
        /**
         * First name
         */
        readonly first_name?: string
        /**
         * Last name
         */
        readonly last_name?: string
        /**
         * Full name
         */
        full_name: string
    }
    namespace UsersList {
        namespace Responses {
            export type $200 = {
                count: number
                next?: string // uri
                previous?: string // uri
                results: API.User[]
            }
        }
    }
}
