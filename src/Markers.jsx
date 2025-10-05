import { useState, useEffect } from 'react'

// Import functions
import { playSound } from './toneSetup'

// Small Component for the Text
const MarkerText = ({ textDisplay, textContent }) => {
  return(
    <div id="text" style={{display: textDisplay ? "block" : "none"}}>
      <p>{textContent}</p>
    </div>
  )
}

// Component for creating Markers and Easter Eggs
export const Markers = ({ selectedPlace }) => {
  const [markersJSX, setMarkersJSX] = useState([])
  const [textDisplay, setTextDisplay] = useState(false)
  const [textContent, setTextContent] = useState(selectedPlace.markers[0].text)

  // Function: Show a Marker's Text
  const showText = (markerText) => {
    setTextContent(markerText)
    setTextDisplay(true)
  }

  // Function: Triggered when clicking on a Marker
  const markerClicked = (marker) => {
    if (selectedPlace.active) {
        // TO-DO: Trigger the appearance of the marker's text
        showText(marker.text)
        console.log(marker.text)
    } else {
        playSound("marker")
    }
  }

  useEffect(() => {
    let tempJSX = [<MarkerText key="markerText" textDisplay={textDisplay} textContent={textContent} />]
    // Create an <img> for each marker in the sekectedPlace's markers property
    selectedPlace.markers.forEach(marker => {
        tempJSX.push(
            <img src="/assets/marker.webp" alt="marker" key={`${marker.x},${marker.y}`} className={selectedPlace.active ? "marker pulsing" : "marker"} onClick={() => markerClicked(marker)} style={{
            left: `${(marker.x / 1280) * 100}%`,
            top: `${(marker.y / 960) * 100}%`,
            }} />
        )
    })
    // Add all of the selectedPlace's Easter Eggs to the scene as well
    selectedPlace.easterEggs.forEach(easterEgg => {
        tempJSX.push(
            <img src={easterEgg.img} alt={easterEgg.alt} key={easterEgg.alt} className="easter-egg" onClick={easterEgg.onClick} style={{
            left: `${(easterEgg.pos.x / 1280) * 100}%`,
            top: `${(easterEgg.pos.y / 960) * 100}%`,
            }} />
        )
    })
    setMarkersJSX(tempJSX)
  }, [textContent, textDisplay])

  return(
    markersJSX
  )
}