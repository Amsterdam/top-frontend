import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/form/Scaffold"

export const generateFormDefinition = (
  users: Components.Schemas.User[],
  onReset: () => void
) => {
  const definition: Fields = {
    user0: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[0]",
        label: "Toezichthouder 1",
        options: users,
        optionLabelField: "full_name"
      }
    },
    user1: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[1]",
        label: "Toezichthouder 2",
        options: users,
        optionLabelField: "full_name"
      }
    },
    user2: {
      type: "UniqueDropdown",
      props: {
        name: "team_members[2]",
        label: "Handhaver",
        options: users,
        optionLabelField: "full_name"
      }
    },
    reset: {
      type: "ResetButton",
      props: {
        onClick: onReset,
        label: "Annuleren"
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        label: "Bewaren"
      }
    }
  }

  return new FormPositioner(definition)
    .setGrid("mobileS", "1fr 1fr", [
      ["user0", "user0"],
      ["user1", "user1"],
      ["user2", "user2"],
      ["reset", "submit"]
    ])
    .getFields()
}
