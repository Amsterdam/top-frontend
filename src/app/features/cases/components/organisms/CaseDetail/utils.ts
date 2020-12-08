import { BrkData, BrkDataError, Case, ImportAdres } from "app/features/types"
import displayAddress from "app/features/shared/utils/displayAddress"

export const getAddress = (address: ImportAdres) => displayAddress(address.sttnaam, address.hsnr, address.hsltr || undefined, address.toev || undefined)

export const getCaseCount = (caseData?: Case) => {
  if (caseData?.bwv_tmp.num_cases === null) {
    return undefined
  }

  return parseInt(caseData?.bwv_tmp.num_cases || "", 10)
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
