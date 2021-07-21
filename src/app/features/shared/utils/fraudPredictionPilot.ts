// caseId from (legacy) BWV always contains an underscore
const strippedCaseId = (caseId: String) => Number(caseId.replaceAll("_", ""))

export const hideFraudProbability = (caseId: String, fraudPredictionPilotEnabled: boolean | undefined) => 
  // if the fraudprediction pilot is enabled AND caseId is odd, hide the prediction
  fraudPredictionPilotEnabled && strippedCaseId( caseId ) % 2 === 1
