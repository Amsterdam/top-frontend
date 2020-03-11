const itineraryToCases = (itinerary?: Itinerary) : BWVData[] =>
  itinerary !== undefined ? itinerary.items.map(({ case: { bwv_data } }) => bwv_data) : []
export default itineraryToCases
