import { useItineraries } from "../index"
import { useMemo } from "react"

// There is no single itinerary endpoint, so we create a convenience hook here:
export const useItinerary = (id: number | string) => {
  const response = useItineraries()
  return useMemo(() => ({
    ...response,
    data: response?.data?.itineraries?.find(_ => _.id.toString() === id.toString())
  }), [response, id])
}
