import { useState, useEffect } from 'react'

// Import functions
import { playSound } from './toneSetup'

// Component for creating Markers and Easter Eggs
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

    selectedPlace.easterEggs.forEach(easterEgg => {
        tempJSX.push(
            <img src={easterEgg.img} alt={easterEgg.alt} key={easterEgg.alt} className="easter-egg" onClick={easterEgg.onClick} style={{
            left: `${(easterEgg.pos.x / 1280) * 100}%`,
            top: `${(easterEgg.pos.y / 960) * 100}%`,
            }} />
        )
    })

    setMarkersJSX(tempJSX)
  }, [])

  return(
    markersJSX
  )
}