import { Case } from "app/features/types"

export const getCaseCount = (caseData?: Case) => {
  if (caseData?.bwv_tmp.num_cases === null) {
    return undefined
  }

  return parseInt(caseData?.bwv_tmp.num_cases || "", 10)
}
