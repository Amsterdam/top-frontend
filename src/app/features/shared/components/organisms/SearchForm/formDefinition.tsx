import React from "react"
import { Close, Search } from "@datapunt/asc-assets"
import {combineValidators, ScaffoldAvailableFields, isMatchingRegex, isRequired} from "amsterdam-react-final-form"
import {FormPositioner, FormPositionerFields} from "amsterdam-scaffold-form/package"

export const definition:FormPositionerFields<ScaffoldAvailableFields> = {
  postalCode: {
    type: "TextField",
    props: {
      label: "Postcode",
      name: "postalCode",
      autoFocus: true,
      validate: combineValidators(
        isRequired(),
        isMatchingRegex(/\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*/, "Geldige postcodes zijn: 1234AA of 1234 aa")
      ),
      tabIndex: 1
    }
  },
  streetNumber: {
    type: "NumberField",
    props: {
      label: "Huisnr.",
      name: "streetNumber",
      min: "1",
      step: "1",
      pattern: "\\d+",
      title: "Alleen cijfers zijn geldig",
      hideNumberSpinner: true,
      validate: isRequired(),
      tabIndex: 2
    }
  },
  suffix: {
    type: "TextField",
    props: {
      label: "Hslt. / etage",
      name: "suffix",
      tabIndex: 3
    }
  },
  reset: {
    type: "ResetButton",
    props: {
      alignedHorizontally: {tabletM: true},
      icon: <Close / >
    }
  },
  submit: {
    type: "SubmitButton",
    props: {
      alignedHorizontally: {tabletM: true},
      icon: <Search / >,
      tabIndex: 4,
      align: "right"
    }
  }
}

// Align these fields in a grid using FormPositioner:
export const scaffoldProps = new FormPositioner(definition)
  // From mobile and bigger we align using a custom grid:
  .setGrid("mobileS", "1fr 1fr", [
    // Grid:
    ["postalCode", "postalCode"],
    ["streetNumber", "suffix"],
    ["reset", "submit"]
  ])
  // From tablet and bigger we align horizontal:
  .setHorizontal("tabletM", "3fr 1fr 1fr auto auto")
  .getScaffoldProps()
