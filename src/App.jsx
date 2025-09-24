import { useState, useRef, useEffect } from 'react'

// Import functions
import { toneInit, ambience, ambienceCrush, playGrind, setGrindVol, playAmbience, stopAmbience, playSound, playTransNoise, stopTransNoise } from './toneSetup'
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
          <p className="smaller">(This is a prototype. Most visual and audio assets are placeholders.)</p>
          <p>For the most complete experience, make sure your sound is on, and that you have given the website permission to access your location.</p>
          <p>Your information will not be collected or recorded.</p>
          <p>Click anywhere to continue.</p>
        </div>
      </div>
    )
  }
}

// Screen 0: Prism
const PrismScreen = ({ changeScreen, currentScreen, prevScreen, showIntroModal, setShowIntroModal }) => {
  // Enter the Prism and transition to the Map Screen
  const enterPrism = async () => {
    const prism = document.querySelector("#prism")
    const prismOverlay = document.querySelector("#prism-screen-overlay")
    console.log("Entering the Prism")
    // Zoom in
    prism.style.setProperty("scale", "10.0")
    prismOverlay.style.setProperty("opacity", "1.0")
    // Play sound
    playSound("enter")
    playTransNoise()
    await wait(5000)
    // Set Current Screen to the Map Screen (1)
    changeScreen(1)
  }

  stopTransNoise()
  setGrindVol(-6)
  stopAmbience()

  // Restore normal zoom if zoomed in
  useEffect(() => {
    document.querySelector("main").style.setProperty("scale", "1.0")
  })

  return(
    <>
      <IntroModal showIntroModal={showIntroModal} setShowIntroModal={setShowIntroModal} />
      <div id="prism-screen-overlay"></div>
      <Prism onClick={enterPrism} currentScreen={currentScreen}/>
    </>
  )
}

// Screen 1: Map
const MapScreen = ({ changeScreen, currentScreen, prevScreen, selectedPlace, setSelectedPlace }) => {
  const [overlayActive, setOverlayActive] = useState(true)
  const [overlayColor, setOverlayColor] = useState("var(--prism-base-color)")

  // Function: Return to the Prism Screen
  const exitPrism = async () => {
    console.log("Returning to the Prism Screen")
    // Play sound
    playSound("back")
    playTransNoise()
    // Change overlay color, then turn it on
    setOverlayColor("var(--prism-base-color)")
    setOverlayActive(true)
    // Wait
    await wait(1000)
    document.querySelector("main").style.setProperty("scale", "10.0")
    await wait(1000)
    // Change Screen
    changeScreen(0)
  }

  // Function: Update the selected Place (normally via arrows, with a parameter of 1 for next or -1 for previous)
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

  // Function: Enter the selected Place, proceeding to the View Screen
  const enterPlace = async (place) => {
    console.log(`Entering: ${place.name}`)
    document.querySelector("main").style.setProperty("scale", "15.0")
    setOverlayColor("black")
    setOverlayActive("true")
    await wait(1000)
    changeScreen(2)
  }

  setGrindVol(-12)  // Set volume of grinding sound
  stopAmbience()    // Stop View Screen ambience if playing

  // Play the transition-in effect
  useEffect(() => {
    // Decide transition overlay color based on previous screen
    setOverlayColor (prevScreen === 0 ? "var(--prism-base-color)" // From Prism Screen
                      : prevScreen === 2 ? "rgba(0,0,0,1)"      // From View Screen
                      : "var(--prism-base-color)")                // Default
    // Turn off the overlay
    setOverlayActive(false)
    // Stop transition sound
    stopTransNoise()
    // Restore normal zoom if zoomed in
    document.querySelector("main").style.setProperty("scale", "1.0")
  }, [])
  
  return(
    <>
      <div id="map-screen-overlay" style={{
        backgroundColor: overlayColor,
        opacity: overlayActive ? 1 : 0,
        }}
       />
      <div className="map-color-overlay"></div>
      <div className="mapTitle">
        <h1>{selectedPlace.name}</h1>
        <h2>{selectedPlace.location}</h2>
        <h3>PROXIMITY: {(selectedPlace.proximity * 99).toFixed(0)}%</h3>
      </div>
      <div className="mapControls">
          <img src="/assets/left.webp" alt="left" onClick={() => { playSound("nav") ; changePlace(-1) }}></img>
          <img src="/assets/go.webp" alt="go" onClick={() => { playSound("go") ; enterPlace(selectedPlace) }}></img>
          <img src="/assets/right.webp" alt="right" onClick={() => { playSound("nav") ; changePlace(1) }}></img>
      </div>
      <div className="mapScreenContainer" style={{ backgroundImage: `url("${selectedPlace.mapSvg}")` }}>
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
const ViewScreen = ({ changeScreen, currentScreen, prevScreen, selectedPlace }) => {
  const [overlayActive, setOverlayActive] = useState(true)

  const returnToMapScreen = async () => {
    // Do animations
    setOverlayActive("true")
    // Wait
    await wait(1000)
    document.querySelector("main").style.setProperty("scale", "10.0")
    await wait(1000)
    // Change Screen
    changeScreen(1)
  }

  // Play the transition-in effect
  useEffect(() => {
    document.querySelector("main").style.setProperty("scale", "1.0")
    const timer = setTimeout(() => setOverlayActive(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  setGrindVol(-24)  // Set volume of grinding sound
  playAmbience()    // Start playing the new ambience
  
  return(
    <>
      <div id="view-screen-overlay" style={{
          backgroundColor: "black",
          opacity: overlayActive ? 1 : 0,
        }}
       />
      <div id="viewControls">
        <img src="/assets/back.webp" alt="left" onClick={() => { playSound("back") ; returnToMapScreen() }} />
      </div>
      <div id="view-screen-container">
        <div id="photo" style={{ backgroundImage: `url("${selectedPlace.photo}")` }}>
          <img id="marker" src="/assets/marker.png" alt="marker" onClick={() => playSound("marker")} style={{
              left: `${(selectedPlace.markers[0].x / 1280) * 100}%`,
              top: `${(selectedPlace.markers[0].y / 960) * 100}%`,
            }} />
          </div>
        </div>
    </>
  )
}

// App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0)            // Integer representing the current Screen
  const [prevScreen, setPrevScreen] = useState(null)               // Integer representing the previous Screen (Used for transitions)
  const [showIntroModal, setShowIntroModal] = useState(true)       // Whether or not the Intro Modal should be rendered
  const [selectedPlace, setSelectedPlace] = useState(places[0])    // The Place currently highlighted/selected on the Map Screen

  const coordsRef = useRef(null)  // Store the user's coordinates

  const changeScreen = (screenInt) => {
    setPrevScreen(currentScreen)
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
              <PrismScreen changeScreen={changeScreen} currentScreen={currentScreen} prevScreen={prevScreen} showIntroModal={showIntroModal} setShowIntroModal={setShowIntroModal}/>
            </main>
          )
    case 1:
          return(
            <main>
              <MapScreen changeScreen={changeScreen} currentScreen={currentScreen} prevScreen={prevScreen} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
            </main>
          )
    case 2:
          return(
            <main>
              <ViewScreen changeScreen={changeScreen} currentScreen={currentScreen} prevScreen={prevScreen} selectedPlace={selectedPlace}/>
            </main>
          )
  }
}

export default App
