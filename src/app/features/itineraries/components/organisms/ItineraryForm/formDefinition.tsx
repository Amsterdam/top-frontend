import { isRequired } from "amsterdam-react-final-form"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import { Fields } from "app/features/shared/components/form/Scaffold"
import {getDayPartOptions} from "./getDayPartOptions";

export const generateItineraryFormDefinition = (
  users: Components.Schemas.User[],
  dayPartOptions: ReturnType<typeof getDayPartOptions>
) => {
  const definition: Fields = {
    user0: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[0]",
        label: "Toezichthouder 1",
        options: users,
        optionLabelField: "full_name",
        withEmptyOption: true,
        validate: isRequired()
      }
    },
    user1: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[1]",
        label: "Toezichthouder 2",
        options: users,
        optionLabelField: "full_name",
        withEmptyOption: true,
        validate: isRequired()
      }
    },
    user2: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[2]",
        label: "Handhaver",
        options: users,
        optionLabelField: "full_name",
        withEmptyOption: true,
        validate: isRequired()
      }
    },
    dayPart: {
      type: "ComplexRadioFields",
      props: {
        label: "Wat voor looplijst wil je maken?",
        name: "dayPart",
        optionLabelField: "label",
        options: dayPartOptions
      }
    },
    numAddresses: {
      type: "NumberField",
      props: {
        label: "Hoeveel adressen wil je in je looplijst? (Max. 20)",
        name: "numAddresses",
        min: 1,
        max: 20,
        validate: isRequired()
      }
    },
    startAddress: {
      type: "AddressPicker",
      props: {
        label: "Startadres",
        name: "startAddress"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Genereer looplijst"
      }
    }
  }

  return new FormPositioner(definition)
    .setVertical("mobileS")
    .getFields()
}
