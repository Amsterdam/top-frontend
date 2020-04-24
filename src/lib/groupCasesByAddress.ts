import displayAddress from "./displayAddress"

type Cases = SearchResultCases

const groupCasesByAddress = (cases: Cases): Cases[] => {
  const l = cases.length
  if (l === 0) return []
  if (l === 1) return [cases]
  const obj = cases.reduce((acc, caseItem) => {
    const {
      street_name: streetName,
      street_number: streetNumber,
      suffix,
      suffix_letter: suffixLetter
    } = caseItem
    const address = displayAddress(streetName, streetNumber, suffix || undefined, suffixLetter || undefined)
    if (!acc.hasOwnProperty(address)) acc[address] = []
    acc[address].push(caseItem)
    return acc
  }, {} as Record<string, Cases>)
  const addresses = Object.keys(obj).sort()
  return addresses.map(address => obj[address])
}

export default groupCasesByAddress
