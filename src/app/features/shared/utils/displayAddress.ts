const displayAddress = (streetName: string, streetNumber: string | number, suffix?: string|null, etage?: string | number | null) =>
  `${ streetName } ${ streetNumber }${ suffix ? suffix : "" }${ etage ? `-${ etage }` : "" }`.trim()

export default displayAddress
