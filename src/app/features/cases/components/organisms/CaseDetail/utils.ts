import { BagData, BagDataError, Case, Address } from "app/features/types"
import displayAddress from "app/features/shared/utils/displayAddress"

export const getAddress = (address: Address) => displayAddress(address.street_name, address.number, address.suffix_letter || undefined, address.suffix || undefined)

export const getBagId = (caseData: Case) => {
  const hasBagData = (caseData?.bag_data as BagDataError).error === undefined
  const bagData = caseData?.bag_data as BagData

  return hasBagData ? (bagData.verblijfsobjectIdentificatie ?? bagData.ligplaatsIdentificatie) : undefined
}

export const isNullish = (a: any): a is undefined | null => a === undefined || a === null || a === ""

const logbookTranslationsMap: Record<string, string> = {
  nobody_present: "Niemand aanwezig",
  no_cooperation: "Geen medewerking",
  access_granted: "Toegang verleend",
  malfunctioning_doorbell: "Bel functioneert niet",
  intercom: "Contact via intercom",
  hotel_furnished: "Hotelmatig ingericht",
  vacant: "Leegstand",
  likely_inhabited: "Vermoedelijk bewoond",
  daytime: "Overdag",
  weekend: "Weekend",
  evening: "'s Avonds",
  unknown: "Onbekend"
}

export const mapLogbookValue = (key: string): string => logbookTranslationsMap[key] ?? key
