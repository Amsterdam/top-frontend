import React, { useState } from "react"
import { Button } from "@amsterdam/asc-ui"

type Coordinates = {
  latitude: number
  longitude: number
}

export const GeoLocator: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setError(null) // Clear any previous errors
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true, // Use high accuracy if available
        timeout: 10000, // Timeout in milliseconds
        maximumAge: 0 // Do not use cached location
      }
    )
  }

  return (
    <div>
      <h1>GPS Location</h1>
      <Button variant="primary" onClick={getLocation}>Wat is mijn locatie?</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  )
}

export default GeoLocator
