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
    current_states,
    reason
  } = itinerary
  const address = displayAddress(streetName, streetNumber, suffixLetter, suffix)
  const state = current_states && current_states.length > 0 ? current_states[0].status_name : undefined
  return `${ address } ${ postalCode } ${ state } ${ reason.name }`
}

export default itineraryToClipboardText
