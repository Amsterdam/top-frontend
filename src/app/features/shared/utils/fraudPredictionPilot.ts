// caseId from (legacy) BWV always contains an underscore
const strippedCaseId = (caseId: String) => Number(caseId.replace("_", ""))

export const hideFraudProbability = (caseId: String, fraudPredictionPilotEnabled: boolean | undefined) => {
  console.log(`caseId: ${ caseId }, fraudPredictionPilotEnabled: ${ fraudPredictionPilotEnabled }`)
  // if the fraudprediction pilot is enabled AND caseId is odd, hide the prediction
  if ( fraudPredictionPilotEnabled && strippedCaseId( caseId ) % 2 === 1 ) {
    return true
  }
  return false
}
