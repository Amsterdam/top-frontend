import { combineValidators, isNotIntersectingWith, isRequired } from "amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "amsterdam-scaffold-form/package"

import { Field } from "app/features/shared/components/form/ScaffoldField"
import postalCodeSiblingValidator from "../SettingsForm/validators/postalCodeSiblingValidator"

import { arrayToObject } from "app/features/shared/utils/arrayToObject"

/**
 * Creates form definition for planningSettings
 */
export const createDefinition = (projects: string[], stadia: string[], postalCodeRangeOptions: any) => {
  // @TODO: Move to config
  const postalCodeMin = 1000
  const postalCodeMax = 1109
  const definition: FormPositionerFields<Field> = {
    opening_date: {
      type: "TextField",
      props: {
        label: "Begindatum van het meest recente stadium",
        name: "settings.opening_date",
        type: "date",
        validate: isRequired()
      }
    },
    geo_type: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Selecteer postcodes of stadsdelen",
        name: "postal_codes_type",
        options: {
          postcode: "Postcodes",
          stadsdeel: "Stadsdelen"
        }
      }
    },
    postal_codes: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { postal_codes_type } }) => postal_codes_type && postal_codes_type === "postcode",
        field: {
          type: "ArrayField",
          props: {
            name: "settings.postal_code_ranges",
            allowAdd: true,
            allowRemove: true,
            minItems: 1,
            columns: {
              "mobileS": "1fr 1fr auto",
              "laptop": "1fr 1fr 1fr 1fr 1fr 1fr"
            },
            scaffoldFields: {
              postal_code_range_start: {
                type: "NumberField",
                props: {
                  name: "range_start",
                  label: "Van",
                  min: postalCodeMin,
                  max: postalCodeMax,
                  validate: postalCodeSiblingValidator("start")
                }
              },
              postal_code_range_end: {
                type: "NumberField",
                props: {
                  name: "range_end",
                  label: "Tot en met",
                  min: postalCodeMin,
                  max: postalCodeMax,
                  validate: postalCodeSiblingValidator("end")
                }
              }
            }
          }
        }
      }
    },
    postalCodeRanges: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { postal_codes_type } }) => postal_codes_type === "stadsdeel",
        field: {
          type: "CheckboxFields",
          props: {
            name: "settings.postal_code_ranges_presets",
            options: postalCodeRangeOptions,
            columnCount: { laptop: 6 },
            validate: isRequired()
          }
        }
      }
    },
    projects: {
      type: "CheckboxFields",
      props: {
        label: "Projecten",
        name: "settings.projects",
        options: arrayToObject(projects),
        validate: isRequired(),
        columnCount: { laptop: 3, laptopL: 5 }
      }
    },
    primary_stadium: {
      type: "SelectField",
      props: {
        label: "1. Zo veel mogelijk",
        name: "settings.primary_stadium",
        options: Object.assign({ "": "Geen voorkeur" }, arrayToObject(stadia)),
        validate: isNotIntersectingWith("settings.exclude_stadia", "‘{item}’ is al geselecteerd bij ‘Uitsluiten’")
      }
    },
    secondary_stadia: {
      type: "CheckboxFields",
      props: {
        label: "2. Aanvullen met",
        name: "settings.secondary_stadia",
        options: arrayToObject(stadia),
        validate: isNotIntersectingWith("settings.exclude_stadia", "‘{item}’ is al geselecteerd bij ‘Uitsluiten’")
      }
    },
    exclude_stadia: {
      type: "CheckboxFields",
      props: {
        label: "3. Uitsluiten",
        name: "settings.exclude_stadia",
        options: arrayToObject(stadia),
        validate: combineValidators(
          isNotIntersectingWith("settings.primary_stadium", "‘{item}’ is al geselecteerd bij ‘Zo veel mogelijk’"),
          isNotIntersectingWith("settings.secondary_stadia", "‘{item}’ is al geselecteerd bij ‘Aanvullen met’")
        )
      }
    }
  }

  // Align properties:
  return new FormPositioner(definition)
    .setVertical("mobileS")
    .setGrid("laptop", "1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "geo_type" ],
      [ "postal_codes", "postal_codes", "postal_codes" ],
      [ "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "projects", "projects", "projects" ],
      [ "primary_stadium", "secondary_stadia", "exclude_stadia" ]
    ])
    .setGrid("laptopL", "1fr 1fr 1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "geo_type" ],
      [ "postal_codes", "postal_codes", "postal_codes", "postal_codes", "postal_codes" ],
      [ "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "projects", "projects", "projects", "projects", "projects" ],
      [ "primary_stadium", "secondary_stadia", "exclude_stadia" ]
    ])
    .getScaffoldProps()
}
