import { isRequired } from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/scaffold-form/package"

import { Field } from "app/features/shared/components/form/ScaffoldField"
import postalCodeSiblingValidator from "../SettingsForm/validators/postalCodeSiblingValidator"

/**
 * Creates form definition for planningSettings
 */

export const createDefinition = (
    postalCodeRangeOptions: any, 
    daySegmentsOptions: any, 
    weekSegmentsOptions: any, 
    prioritiesOptions: any,
    reasonsOptions: any,
    stateTypeOptions: any
  ) => {
  // @TODO: Move to config
  const postalCodeMin = 1000
  const postalCodeMax = 1109

  const definition: FormPositionerFields<Field> = {
    opening_date: {
      type: "TextField",
      props: {
        label: "Begindatum van het meest recente stadium",
        name: "opening_date",
        type: "date",
        validate: isRequired()
      }
    },
    divider1: {
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
            name: "postal_code_ranges",
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
            name: "postal_code_ranges_presets",
            options: postalCodeRangeOptions,
            columnCount: { mobileM: 2, tabletM: 4 },
            validate: isRequired()
          }
        }
      }
    },
    divider2: {
        type: "Divider",
        props: {}
    },
    daySegments: {
      type: "CheckboxFields",
      props: {
        label: "Met welk deel van de dag wil je dat de looplijsten gegenereerd worden?",
        name: "day_segments",
        options: daySegmentsOptions,
        columnCount: { mobileM: 2, tabletM: 4 },
        validate: isRequired()
      }
    },
    weekSegments: {
        type: "CheckboxFields",
        props: {
          label: "Met welk deel van de week wil je dat de looplijsten gegenereerd worden?",
          name: "week_segments",
          options: weekSegmentsOptions,
          columnCount: { mobileM: 2, tabletM: 4 },
          validate: isRequired()
        }
      },
      divider3: {
        type: "Divider",
        props: {}
      },
      priorities: {
          type: "CheckboxFields",
          props: {
            label: "Met welke prioriteit wil je dat de looplijsten gegenereerd worden?",
            name: "priorities",
            options: prioritiesOptions,
            columnCount: { mobileM: 2, tabletM: 4 },
            validate: isRequired()
          }
        },
        divider4: {
          type: "Divider",
          props: {}
        },
        stateTypes: {
          type: "CheckboxFields",
          props: {
            label: "Met welke status wil je dat de looplijsten gegenereerd worden?",
            name: "state_types",
            options: stateTypeOptions,
            columnCount: { mobileM: 2, tabletM: 4 },
            validate: isRequired()
          }
        },
        divider6: {
          type: "Divider",
          props: {}
        },
      reasons: {
        type: "CheckboxFields",
        props: {
          label: "Met welke openingsredenen wil je dat de looplijsten gegenereerd worden?",
          name: "reasons",
          options: reasonsOptions,
          columnCount: { mobileM: 2, tabletM: 4 },
          validate: isRequired()
        }
      },
      divider5: {
        type: "Divider",
        props: {}
      }
  }

  // Align properties:
  return new FormPositioner(definition)
    .setVertical("mobileS")
    .setGrid("tabletM", "1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1" ],
      [ "geo_type", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider2", "divider2", "divider2" ],
      [ "reasons", "reasons", "reasons" ],
      [ "divider3", "divider3", "divider3" ],
      [ "stateTypes", "stateTypes", "stateTypes" ],
      [ "divider6", "divider6", "divider6" ],
      [ "daySegments", "daySegments", "daySegments" ],
      [ "divider4", "divider4", "divider4" ],
      [ "weekSegments", "weekSegments", "weekSegments" ],
      [ "divider5", "divider5", "divider5" ],
      [ "priorities", "priorities", "priorities" ]
    ])
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1", "divider1", "divider1" ],
      [ "geo_type", "postal_codes", "postal_codes", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider2", "divider2", "divider2", "divider2", "divider2" ],
      [ "reasons", "reasons", "reasons", "reasons", "reasons" ],
      [ "divider3", "divider3", "divider3", "divider3", "divider3" ],
      [ "stateTypes", "stateTypes", "stateTypes", "stateTypes", "stateTypes" ],
      [ "divider6", "divider6", "divider6", "divider6", "divider6" ],
      [ "daySegments", "daySegments", "daySegments", "daySegments", "daySegments" ],
      [ "divider4", "divider4", "divider4", "divider4", "divider4" ],
      [ "weekSegments", "weekSegments", "weekSegments", "weekSegments", "weekSegments" ],
      [ "divider5", "divider5", "divider5", "divider5", "divider5" ],
      [ "priorities", "priorities", "priorities", "priorities", "priorities" ]
    ])
    .getScaffoldProps()
}
