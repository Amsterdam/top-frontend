import { BrkData, BrkDataError, Case, ImportAdres } from "app/features/types"
import displayAddress from "app/features/shared/utils/displayAddress"

export const getAddress = (address: ImportAdres) => displayAddress(address.sttnaam, address.hsnr, address.hsltr || undefined, address.toev || undefined)

export const getCaseCount = (caseData: Case) => {
  if (caseData.bwv_tmp.num_cases === null) {
    return undefined
  }

  return parseInt(caseData.bwv_tmp.num_cases || "", 10)
}

export const getEigenaar = (caseData: Case) => {
  const hasBrkData = (caseData.brk_data as BrkDataError).error === undefined

  if (!hasBrkData) {
    return undefined
  }

  const brkData = caseData.brk_data as BrkData

  if (brkData.owners.length) {
    return brkData.owners.map(owner => owner._display).join(", ")
  }

  return undefined
}

export const isNullish = (a: any): a is undefined|null => a === undefined || a === null || a === ""

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
