import { combineValidators, isNotIntersectingWith, isRequired } from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/scaffold-form/package"

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
    divider1: {
      type: "Divider",
      props: {}
    },
    sia_presedence: {
      type: "Boolean",
      props: {
        label: "Geef SIA meldingen voorrang",
        name: "settings.sia_presedence",
        style: { top: 2, left: 0 }
      }
    },
    divider2: {
      type: "Divider",
      props: {}
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
              "tabletM": "1fr 1fr 1fr",
              "laptopM": "1fr 1fr 1fr 1fr"
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
            columnCount: { mobileM: 2, tabletM: 4 },
            validate: isRequired()
          }
        }
      }
    },
    divider3: {
      type: "Divider",
      props: {}
    },
    projects: {
      type: "CheckboxFields",
      props: {
        label: "Projecten",
        name: "settings.projects",
        options: arrayToObject(projects),
        validate: isRequired(),
        columnCount: { tabletM: 3, laptop: 4, laptopM: 5 }
      }
    },
    divider4: {
      type: "Divider",
      props: {}
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
        validate: isNotIntersectingWith("settings.exclude_stadia", "‘{item}’ is al geselecteerd bij ‘Uitsluiten’"),
        columnCount: { laptopL: 2 }
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
        ),
        columnCount: { laptopL: 2 }
      }
    }
  }

  // Align properties:
  return new FormPositioner(definition)
    .setVertical("mobileS")
    .setGrid("tabletM", "1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1" ],
      [ "sia_presedence" ],
      [ "divider2", "divider2", "divider2" ],
      [ "geo_type", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider3", "divider3", "divider3" ],
      [ "projects", "projects", "projects" ],
      [ "divider4", "divider4", "divider4" ],
      [ "primary_stadium", "secondary_stadia", "exclude_stadia" ]
    ])
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1", "divider1", "divider1" ],
      [ "sia_presedence" ],
      [ "divider2", "divider2", "divider2", "divider2", "divider2" ],
      [ "geo_type", "postal_codes", "postal_codes", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider3", "divider3", "divider3", "divider3", "divider3" ],
      [ "projects", "projects", "projects", "projects", "projects" ],
      [ "divider4", "divider4", "divider4", "divider4", "divider4" ],
      [ "primary_stadium", "secondary_stadia", "secondary_stadia", "exclude_stadia", "exclude_stadia" ]
    ])
    .getScaffoldProps()
}
