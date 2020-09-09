// Be careful
// ==========
// BWV data has the fields `suffix` and `suffix_letter`
// `suffix_letter` = `suffix`
// `suffix` = `etage`
// So should be called like `displayAddress(street_name, street_number, suffix_letter, suffix)`

const displayAddress = (streetName: string, streetNumber: string | number, suffix?: string | null, etage?: string | number | null) =>
  `${ streetName } ${ streetNumber }${ suffix ? suffix : "" }${ etage ? `-${ etage }` : "" }`.trim()

export default displayAddress
