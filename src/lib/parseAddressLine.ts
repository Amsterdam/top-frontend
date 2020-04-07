const parseAddressLine = (line: string) : [PostalCode, StreetNumber, StreetSuffix | undefined] | undefined => {
  // postal code
  const regExpPostalCode = /[1-9][0-9]{3}\s?[A-Za-z]{2}/
  const match = line.match(regExpPostalCode)
  const postalCode = match ? match[0].replace(/\s/g, "") : undefined
  if (postalCode === undefined) return

  // street number, suffix
  const parts = line.split(regExpPostalCode)
  const address = parts.length ? parts[0] : undefined
  if (address === undefined) return
  const matchAddress = address.match(/\s([1-9][0-9]*)[\s|-]*([^,]*)/)
  if (matchAddress == null) return
  const streetNumber = parseInt(matchAddress[1], 10)
  const streetSuffix = matchAddress[2].trim() || undefined

  return [postalCode, streetNumber, streetSuffix]
}
export default parseAddressLine
