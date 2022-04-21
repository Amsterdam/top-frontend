import { isRequired } from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/amsterdam-react-final-form"
import _isEmpty from "lodash/isEmpty"

import config from "app/config/config"
import { Field } from "app/features/shared/components/form/ScaffoldField"
import postalCodeSiblingValidator from "../SettingsForm/validators/postalCodeSiblingValidator"
import isSubletting from "app/features/settings/utils/isSubletting"

/**
 * Creates form definition for planningSettings
 */

export const createDefinition = (
  postalCodeRangeOptions: any,
  daySegmentsOptions: any,
  weekSegmentsOptions: any,
  prioritiesOptions: any,
  reasonsOptions: any,
  stateTypeOptions: any,
  projectOptions: any,
  corporationOptions: any,
  teamSettings?: Components.Schemas.TeamSettings | Components.Schemas.DaySettings["team_settings"]
) => {
  const { allowedPostalCodes } = config.settings
  const isSublet = isSubletting(teamSettings) // Onderhuur

  const definition: FormPositionerFields<Field> = {
    name: {
      type: "TextField",
      props: {
        label: "Geef deze daginstelling een naam",
        name: "name",
        type: "text",
        validate: isRequired()
      }
    },
    opening_date: {
      type: "TextField",
      props: {
        label: "Begindatum van ingeplande bezoeken",
        name: "opening_date",
        type: "date",
        validate: isRequired()
      }
    },
    max_use_limit: {
      type: "SelectField",
      props: {
        label: "Hoeveel looplijsten mogen deze instelling gebruiken?",
        name: "max_use_limit",
        options: { "0": "Onbeperkt", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5" }
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
                  validate: postalCodeSiblingValidator("start", allowedPostalCodes)
                }
              },
              postal_code_range_end: {
                type: "NumberField",
                props: {
                  name: "range_end",
                  label: "Tot en met",
                  validate: postalCodeSiblingValidator("end", allowedPostalCodes)
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
    housingCorporationCombiteam: {
      type: "ShowHide",
      props: {
        shouldShow: () => isSublet, // Sublet use only.
        field: {
          type: "Boolean",
          props: {
            label: "Wil je deze looplijst samenlopen met een corporatie?",
            name: "housing_corporation_combiteam",
            checkboxLabel: "Ja"
          }
        }
      }
    },
    housingCorporations: {
      type: "ShowHide",
      props: {
        shouldShow: () => isSublet, // Sublet use only.
        field: {
          type: "CheckboxFields",
          props: {
            label: "Met welke corporaties wil je dat de looplijsten gegenereerd worden?",
            name: "housing_corporations",
            options: corporationOptions,
            columnCount: { mobileM: 2, tabletM: 4 }
          }
        }
      }
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
    filteredProjects: {
      type: "ShowHide",
      props: {
        shouldShow: () => !_isEmpty(projectOptions), // If there are no projects, remove question and divider.
        field: {
          type: "CheckboxFields",
          props: {
            label: "Met welke projecten wil je dat de looplijsten gegenereerd worden?",
            name: "project_ids",
            options: projectOptions,
            columnCount: { mobileM: 2, tabletM: 4 }
          }
        }
      }
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
    priorities: {
      type: "CheckboxFields",
      props: {
        label: "Met welke prioriteiten wil je dat de looplijsten gegenereerd worden?",
        name: "priorities",
        options: prioritiesOptions,
        columnCount: { mobileM: 2, tabletM: 4 },
        validate: isRequired()
      }
    },
    divider1: {
      type: "Divider",
      props: {}
    },
    divider2: {
      type: "Divider",
      props: {}
    },
    divider3: {
      type: "Divider",
      props: {}
    },
    divider4: {
      type: "ShowHide",
      props: {
        shouldShow: () => !_isEmpty(projectOptions), // If there are no projects, remove question and divider.
        field: {
          type: "Divider",
          props: {}
        }
      }
    },
    divider5: {
      type: "Divider",
      props: {}
    },
    divider6: {
      type: "Divider",
      props: {}
    },
    divider7: {
      type: "Divider",
      props: {}
    },
    divider8: {
      type: "Divider",
      props: {}
    },
    divider9: {
      type: "Divider",
      props: {}
    },
    divider10: {
      type: "ShowHide",
      props: {
        shouldShow: () => isSublet, // Sublet use only.
        field: {
          type: "Divider",
          props: {}
        }
      }
    }
  }

  // Align properties:
  return new FormPositioner(definition)
    .setVertical("mobileS")
    .setGrid("tabletM", "1fr 1fr 1fr", [
      [ "divider1", "divider1", "divider1" ],
      [ "name", "max_use_limit" ],
      [ "opening_date", "opening_date" ],
      [ "divider2", "divider2", "divider2" ],
      [ "geo_type", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider3", "divider3", "divider3" ],
      [ "housingCorporationCombiteam", "housingCorporationCombiteam", "housingCorporationCombiteam" ],
      [ "housingCorporations", "housingCorporations", "housingCorporations" ],
      [ "divider10", "divider10", "divider10" ],
      [ "reasons", "reasons", "reasons" ],
      [ "divider9", "divider9", "divider9" ],
      [ "filteredProjects", "filteredProjects", "filteredProjects" ],
      [ "divider4", "divider4", "divider4" ],
      [ "stateTypes", "stateTypes", "stateTypes" ],
      [ "divider5", "divider5", "divider5" ],
      [ "daySegments", "daySegments", "daySegments" ],
      [ "divider6", "divider6", "divider6" ],
      [ "weekSegments", "weekSegments", "weekSegments" ],
      [ "divider7", "divider7", "divider7" ],
      [ "priorities", "priorities", "priorities" ],
      [ "divider8", "divider8", "divider8" ]
    ])
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr", [
      [ "divider1", "divider1", "divider1", "divider1", "divider1" ],
      [ "name", "name", "max_use_limit" ],
      [ "opening_date", "opening_date" ],
      [ "divider2", "divider2", "divider2", "divider2", "divider2" ],
      [ "geo_type", "postal_codes", "postal_codes", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider3", "divider3", "divider3", "divider3", "divider3" ],
      [ "housingCorporationCombiteam", "housingCorporationCombiteam", "housingCorporationCombiteam", "housingCorporationCombiteam", "housingCorporationCombiteam" ],
      [ "housingCorporations", "housingCorporations", "housingCorporations", "housingCorporations", "housingCorporations" ],
      [ "divider10", "divider10", "divider10", "divider10", "divider10" ],
      [ "reasons", "reasons", "reasons", "reasons", "reasons" ],
      [ "divider9", "divider9", "divider9", "divider9", "divider9" ],
      [ "filteredProjects", "filteredProjects", "filteredProjects", "filteredProjects", "filteredProjects" ],
      [ "divider4", "divider4", "divider4", "divider4", "divider4" ],
      [ "stateTypes", "stateTypes", "stateTypes", "stateTypes", "stateTypes" ],
      [ "divider5", "divider5", "divider5", "divider5", "divider5" ],
      [ "daySegments", "daySegments", "daySegments", "daySegments", "daySegments" ],
      [ "divider6", "divider6", "divider6", "divider6", "divider6" ],
      [ "weekSegments", "weekSegments", "weekSegments", "weekSegments", "weekSegments" ],
      [ "divider7", "divider7", "divider7", "divider7", "divider7" ],
      [ "priorities", "priorities", "priorities", "priorities", "priorities" ],
      [ "divider8", "divider8", "divider8", "divider8", "divider8" ]
    ])
    .getScaffoldProps()
}
