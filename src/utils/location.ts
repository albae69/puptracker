import { useState } from 'react'

export default function useGetLocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords)
    })
  } else {
    alert('failed to get current location')
  }
  let latitude, longitude

  if (coords != null) {
    return { latitude, longitude }
  }

  return { latitude: 3.595196, longitude: 98.672226 }
}
