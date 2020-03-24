const getItineraryByCaseId = (itineraries: Itineraries, caseId: CaseId) =>
  itineraries.find(({ items }) => items.find(({ case: { bwv_data: { case_id } } }) => case_id === caseId) !== undefined)
export default getItineraryByCaseId
