import { Fields } from "../form/Scaffold"
import { isRequired } from "amsterdam-react-final-form"
import { FormPositioner } from "amsterdam-scaffold-form/package"

export const generateNotesFormDefinition = (nawText: string, handleNawClick: () => Promise<void>) => {
  const definition: Fields = {
    text: {
      type: "TextAreaField",
      props: {
        name: "text",
        rows: 10,
        maxLength: 1024,
        autoFocus: true,
        validate: isRequired()
      }
    },
    nawButton: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { text } }) => text === undefined || text === "",
        field: {
          type: "ResetButton",
          props: {
            align: "right",
            variant: "secondary",
            label: nawText,
            onClick: handleNawClick
          }
        }
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Bewaren"
      }
    }
  }

  return new FormPositioner(definition)
    .setGrid("mobileS", "1fr auto", [
      ["text", "text"],
      ["nawButton", "submit"]
    ])
    .getScaffoldProps()
}
