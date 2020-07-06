import {
  combineValidators,
  isAboveOtherField,
  isBelowOtherField,
  isNotIntersectingWith,
  isRequired, ScaffoldAvailableFields
} from "amsterdam-react-final-form"

import { Day, DayPart } from "../../lib/utils/day"
import { arrayToObject } from "../../lib/arrayToObject"
import { FormPositioner, FormPositionerFields } from "amsterdam-scaffold-form/package"
import { Field } from "../form/ScaffoldField"

/**
 * Creates form-definition for collapsible day-part-groups.
 */
const createDayPartDefinition = (label: string, day: Day, dayPart: DayPart, stadia: Stadia, isOpen: boolean = false): Field => {
  // Field names:
  const primaryStadium = `days.${ day }.${ dayPart }.primary_stadium`
  const secondaryStadia = `days.${ day }.${ dayPart }.secondary_stadia`
  const excludeStadia = `days.${ day }.${ dayPart }.exclude_stadia`

  // Dropdown options for primary:
  const options = stadia.reduce((acc, stadium) => ({ ...acc, [stadium]:stadium }), { "": "Geen" })

  const definition: FormPositionerFields<ScaffoldAvailableFields> = {
    primary_stadium: {
      type: "SelectField",
      props: {
        label: "1. Zoveel mogelijk",
        name: primaryStadium,
        options,
        validate: isNotIntersectingWith(excludeStadia, "\"{item}\" is al geselecteerd bij \"Uitsluiten\"")
      }
    },
    secondary_stadia: {
      type: "CheckboxFields",
      props: {
        label: "2. Aanvullen met",
        name: secondaryStadia,
        options: arrayToObject(stadia),
        validate: isNotIntersectingWith(excludeStadia, "\"{item}\" is al geselecteerd bij \"Uitsluiten\"")
      }
    },
    exclude_stadia: {
      type: "CheckboxFields",
      props: {
        label: "3. Uitsluiten",
        name: excludeStadia,
        options: arrayToObject(stadia),
        validate: combineValidators(
          isNotIntersectingWith(primaryStadium, "\"{item}\" is al geselecteerd bij \"Zoveel mogelijk\""),
          isNotIntersectingWith(secondaryStadia, "\"{item}\" is al geselecteerd bij \"Aanvullen met\"")
        )
      }
    }
  }

  // Position them vertically:
  const fields = new FormPositioner(definition)
    .setVertical("mobileS")
    .getFields()


  // Wrap in a Collapsible:
  return {
    type: "Collapsible",
    props: {
      isOpen,
      label,
      fields
    }
  }
}

/**
 * Creates form definition for planningSettings
 */
export const createDefinition = (projects: Projects, stadia: Stadia) => {
  const definition: FormPositionerFields<Field> = {
    opening_date: {
      type: "TextField",
      props: {
        label: "Kies de begindatum van het meest recente stadium",
        name: "opening_date",
        type: "date",
        validate: isRequired()
      }
    },
    postal_code_start: {
      type: "NumberField",
      props: {
        label: "Postcode van",
        name: "postal_code.range_start",
        min: 1000,
        max: 1109,
        validate: isBelowOtherField("postal_code.range_end", "De waarde moet lager zijn dan \"Postcode tot\"")
      }
    },
    postal_code_end: {
      type: "NumberField",
      props: {
        label: "Postcode tot",
        name: "postal_code.range_end",
        min: 1000,
        max: 1109,
        validate: isAboveOtherField("postal_code.range_start", "De waarde moet hoger zijn dan \"Postcode van\"")
      }
    },
    projects: {
      type: "CheckboxFields",
      props: {
        label: "Projecten",
        name: "projects",
        options: arrayToObject(projects),
        validate: isRequired(),
        columnCount: { laptop: 3, laptopL: 5 }
      }
    },

    monday_day: createDayPartDefinition("Maandag dag", "monday", "day", stadia, true),
    monday_evening: createDayPartDefinition("Maandag avond", "monday", "evening", stadia),

    tuesday_day: createDayPartDefinition("Dinsdag dag", "tuesday", "day", stadia, true),
    tuesday_evening: createDayPartDefinition("Dinsdag avond", "tuesday", "evening", stadia),

    wednesday_day: createDayPartDefinition("Woensdag dag", "wednesday", "day", stadia, true),
    wednesday_evening: createDayPartDefinition("Woensdag avond", "wednesday", "evening", stadia),

    thursday_day: createDayPartDefinition("Donderdag dag", "thursday", "day", stadia, true),
    thursday_evening: createDayPartDefinition("Donderdag avond", "thursday", "evening", stadia),

    friday_day: createDayPartDefinition("Vrijdag dag", "friday", "day", stadia, true),
    friday_evening: createDayPartDefinition("Vrijdag avond", "friday", "evening", stadia),

    saturday_day: createDayPartDefinition("Zaterdag weekend", "saturday", "day", stadia, true),
    sunday_day: createDayPartDefinition("Zondag weekend", "sunday", "day", stadia, true)
  }

  // Align properties:
  return new FormPositioner(definition)
    // 1 column
    .setVertical("mobileS")
    // 3 columns:
    .setGrid("laptop", "1fr 1fr 1fr", [
      /* eslint-disable no-multi-spaces */
      [ "opening_date"                                                ],
      [ "postal_code_start",  "postal_code_end"                       ],
      [ "projects",           "projects",         "projects"          ],
      [ "monday_day",         "tuesday_day",      "wednesday_day"     ],
      [ "thursday_day",       "friday_day"                            ],
      [ "saturday_day",       "sunday_day"                            ],
      [ "monday_evening",     "tuesday_evening",  "wednesday_evening" ],
      [ "thursday_evening",   "friday_evening"                        ]
      /* eslint-enable */
    ])
    // 5 columns
    .setGrid("laptopL", "1fr 1fr 1fr 1fr 1fr", [
      /* eslint-disable no-multi-spaces */
      [ "opening_date"                                                                                        ],
      [ "postal_code_start",  "postal_code_end"                                                               ],
      [ "projects",           "projects",         "projects",           "projects",         "projects"        ],
      [ "monday_day",         "tuesday_day",      "wednesday_day",      "thursday_day",     "friday_day"      ],
      [ "saturday_day",       "sunday_day"                                                                    ],
      [ "monday_evening",     "tuesday_evening",  "wednesday_evening",  "thursday_evening", "friday_evening"  ]
      /* eslint-enable */
    ])
    .getScaffoldProps()
}
