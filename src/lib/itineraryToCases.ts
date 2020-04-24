const itineraryToCases = (itinerary?: Itinerary): BWVData[] =>
  itinerary !== undefined
    ? itinerary
        .items
        .filter(({ checked }) => !checked) // <- Only return items that are not checked
        .map(({ case: { bwv_data } }) => bwv_data)
    : []
export default itineraryToCases
