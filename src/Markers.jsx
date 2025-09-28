import { useState, useEffect } from 'react'

// Component for creating Markers (and Easter Eggs, later on.)
export const Markers = ({ selectedPlace }) => {
  const [markersJSX, setMarkersJSX] = useState([])

  useEffect(() => {
    let tempJSX = []
    selectedPlace.markers.forEach(marker => {
      tempJSX.push(
        <img src="/assets/marker.webp" alt="marker" key={`${marker.x},${marker.y}`} className={selectedPlace.active ? "marker, pulsing" : "marker"} onClick={() => playSound("marker")} style={{
          left: `${(marker.x / 1280) * 100}%`,
          top: `${(marker.y / 960) * 100}%`,
        }} />
      )
    })
    setMarkersJSX(tempJSX)
  }, [])

  return(
    markersJSX
  )
}