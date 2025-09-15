import { useState, useRef, useEffect } from 'react'

// Import functions
import { toneInit, ambience, ambienceCrush, playGrind, setGrindVol, playAmbience, stopAmbience, playSound } from './toneSetup'
import { wait, lerp } from "./helperFunctions"

// Import Places
import { places } from "./places"

// Import components
import { Prism } from "./Prism"

// Import stylesheets
import "normalize.css"
import "./App.css"
import "./PrismScreen.css"
import "./MapScreen.css"
import "./ViewScreen.css"
import "./Prism.css"

// Intro Modal
const IntroModal = ({ showIntroModal, setShowIntroModal }) => {

  if (showIntroModal) {
    return(
      <div id="intro-modal-background" onClick={ () => { setShowIntroModal(false) ; toneInit() ; playGrind() } }>
        <div id="intro-modal">
          <p>Click to begin</p>
        </div>
      </div>
    )
  }
}

// Screen 0: Prism
const PrismScreen = ({ changeScreen, currentScreen, showIntroModal, setShowIntroModal }) => {
  // Enter the Prism and transition to the Map Screen
  const enterPrism = async () => {
    const prism = document.querySelector("#prism")
    const prismOverlay = document.querySelector("#prism-overlay")
    console.log("Entering the Prism")
    // Zoom in
    prism.style.setProperty("scale", "10.0")
    prismOverlay.style.setProperty("opacity", "1.0")
    await wait(5000)
    // Overlay

    // Set Current Screen to the Map Screen (1)
    changeScreen(1)
  }

  setGrindVol(-6)
  stopAmbience()

  return(
    <>
      <IntroModal showIntroModal={showIntroModal} setShowIntroModal={setShowIntroModal} />
      <div id="prism-overlay"></div>
      <Prism onClick={enterPrism} currentScreen={currentScreen}/>
    </>
  )
}

// Screen 1: Map
const MapScreen = ({ changeScreen, currentScreen, selectedPlace, setSelectedPlace }) => {
  // Return to the Prism Screen
  const exitPrism = async () => {
    console.log("Returning to the Prism Screen")
    // Play sound

    // Change screen
    changeScreen(0)
  }

  // Update the selected Place (normally via arrows, with a parameter of 1 for next or -1 for previous)
  const changePlace = (offset) => {
    // Find out what the new Place's index should be
    let oldPlaceIndex = places.findIndex(place => place === selectedPlace)
    let newPlaceIndex = oldPlaceIndex + offset
    // Correct for over/under-shooting the amount of valid Places
    if (newPlaceIndex >= places.length) { newPlaceIndex = 0 }
    if (newPlaceIndex < 0) { newPlaceIndex = places.length-1 }
    // Set the new Place
    setSelectedPlace(places[newPlaceIndex])
    console.log(`Selected Place is now ${JSON.stringify(places[newPlaceIndex])} (Index: ${newPlaceIndex})`)
    // Set the correct ambient sound in Tone
    ambience.load(places[newPlaceIndex].ambience)
    // Set the correct bitcrushing based on proximity
    const crushBits = lerp(6, 10, places[newPlaceIndex].proximity)
    ambienceCrush.bits.value = crushBits
    console.log(`New bits: ${crushBits}`)
  }

  const enterPlace = (place) => {
    console.log(`Entering: ${place.name}`)
    changeScreen(2)
  }
  
  setGrindVol(-12)
  stopAmbience()

  const r = document.querySelector(":root")
  r.style.setProperty("--map-image", `url("${selectedPlace.mapImg}")`)

  return(
    <>
      <div className="mapTitle">
        <h1>{selectedPlace.name}</h1>
        <h2>{selectedPlace.location}</h2>
      </div>
      <div className="mapControls">
          <img src="/src/assets/left.png" alt="left" onClick={() => { playSound("nav") ; changePlace(-1) }}></img>
          <img src="/src/assets/go.png" alt="go" onClick={() => { playSound("go") ; enterPlace(selectedPlace) }}></img>
          <img src="/src/assets/right.png" alt="right" onClick={() => { playSound("nav") ; changePlace(1) }}></img>
      </div>
      <div className="mapScreenContainer">
        <div className="mapViewport">

        </div>
        <div className="bottomBar">
          <Prism onClick={exitPrism} currentScreen={currentScreen}/>
        </div>
      </div>
    </>
  )
}

// Screen 2: View
const ViewScreen = ({ changeScreen, currentScreen, selectedPlace }) => {
  useEffect(() => {
    const viewScreenContainer = document.querySelector("#view-screen-container")
    viewScreenContainer.style.setProperty("background-image", `url("${selectedPlace.photo}")`)
  }, [selectedPlace])

  useEffect(() => {
    setGrindVol(-24)

    stopAmbience()
    playAmbience()
  }, [])
  
  return(
    <>
      <div id="marker">
        <img src="/src/assets/marker.png" alt="marker" onClick={() => playSound("marker")} />
      </div>
      <div id="viewControls">
        <img src="/src/assets/back.png" alt="left" onClick={() => { playSound("back") ; changeScreen(1) }} />
      </div>
      <div id="view-screen-container">

      </div>
    </>
  )
}

// App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0)         // Integer representing the current Screen
  const [showIntroModal, setShowIntroModal] = useState(true)    // Whether or not the Intro Modal should be rendered
  const [selectedPlace, setSelectedPlace] = useState(places[0]) // The Place currently highlighted/selected on the Map Screen

  const coordsRef = useRef(null)

  const changeScreen = (screenInt) => {
    setCurrentScreen(screenInt)
    console.log(`Changing to screen: ${screenInt}`)
  }

  // Function: Calculate the "proximity" values for each place, and store them in the object
  const calcProximities = () => {
    // Calculate the distance between the user and the place
    places.forEach(place => {
      const latDiff = Math.abs(place.lat - coordsRef.current.latitude)
      const longDiff = Math.abs(place.long - coordsRef.current.longitude)
      place.distance = (latDiff + longDiff) / 2
    })

    // Sort a copy of places from closest to furthest
    const sorted = [...places].sort((a, b) => a.distance - b.distance)

    // Assign proximity: 1 for closest, 0 for farthest, evenly spaced
    const n = sorted.length
    sorted.forEach((place, idx) => {
      place.proximity = n === 1 ? 1 : 1 - idx / (n - 1)
    })
  }

  // Try and get the user's location
  if (coordsRef.current === null) {
    navigator.geolocation.getCurrentPosition((position) => {
      // On success
      coordsRef.current = position.coords
      console.log(`User coords: ${JSON.stringify(coordsRef.current)}`)
      // Calculate proximity values
      calcProximities()
    }, (positionError) => {
      // On fail
      coordsRef.current = {
        latitude: -37.8,
        longitude: 145,
      }
      console.log(`Using default coords: ${JSON.stringify(coordsRef.current)}`)
      // Calculate proximity values
      calcProximities()
    })
  }

  switch (currentScreen) {
    case 0:
          return(
            <main>
              <PrismScreen changeScreen={changeScreen} currentScreen={currentScreen} showIntroModal={showIntroModal} setShowIntroModal={setShowIntroModal}/>
            </main>
          )
    case 1:
          return(
            <main>
              <MapScreen changeScreen={changeScreen} currentScreen={currentScreen} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
            </main>
          )
    case 2:
          return(
            <main>
              <ViewScreen changeScreen={changeScreen} currentScreen={currentScreen} selectedPlace={selectedPlace}/>
            </main>
          )
  }
}

export default App
