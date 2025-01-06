import { useState, useCallback, useEffect } from "react"

type Coordinates = {
  latitude: number
  longitude: number
}

type UseLocationReturn = {
  location: Coordinates | null
  isBusy: boolean
  getLocation: () => void
}

export const useGeoLocation = (): UseLocationReturn => {
  const [isBusy, setIsBusy] = useState(true)
  const [location, setLocation] = useState<Coordinates | null>(null)

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.log("TOP: Geolocation is not supported by your browser")
      setIsBusy(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (err) => {
        console.log("TOP:", err.message)
      },
      {
        enableHighAccuracy: true, // Use high accuracy if available
        timeout: 10000, // Timeout in milliseconds
        maximumAge: 0 // Do not use cached location
      }
    )
    setIsBusy(false)
  }, [])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return { location, isBusy, getLocation }
}
