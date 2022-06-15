import displayAddress from "app/features/shared/utils/displayAddress"

import { Case } from "app/features/types"

const itineraryToClipboardText = (itinerary: Case) => {
  const {
    address: {
      street_name: streetName,
      number: streetNumber,
      suffix,
      suffix_letter: suffixLetter,
      postal_code: postalCode
    },
    workflows,
    reason
  } = itinerary
  const address = displayAddress(streetName, streetNumber, suffixLetter, suffix)
  const state = workflows && workflows.length > 0 ? workflows[0].state.name : undefined
  return `${ address } ${ postalCode } ${ state } ${ reason.name }`
}

export default itineraryToClipboardText
