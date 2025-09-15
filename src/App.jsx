import { useState, useRef, useEffect } from 'react'

// Import functions
import { toneInit, playGrind, setGrindVol } from './toneSetup'
import { wait } from "./helperFunctions"

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
    prism.style.setProperty("scale", "3.0")
    prismOverlay.style.setProperty("opacity", "1.0")
    await wait(5000)
    // Overlay

    // Set Current Screen to the Map Screen (1)
    changeScreen(1)
  }

  setGrindVol(-6)

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
    // Play sound

    // Process visual changes
    // Get the Document :root so we can access CSS variables

    
  }

  const enterPlace = (place) => {
    console.log(`Entering: ${place.name}`)
    changeScreen(2)
  }
  
  setGrindVol(-12)

  const r = document.querySelector(":root")
  r.style.setProperty("--map-image", `url("${selectedPlace.mapImg}")`)

  return(
    <>
      <div className="mapTitle">
        <h1>{selectedPlace.name}</h1>
        <h2>{selectedPlace.location}</h2>
      </div>
      <div className="mapControls">
          <img src="/src/assets/left.png" alt="left" onClick={() => changePlace(-1)}></img>
          <img src="/src/assets/go.png" alt="go" onClick={() => enterPlace(selectedPlace)}></img>
          <img src="/src/assets/right.png" alt="right" onClick={() => changePlace(1)}></img>
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
  
  return(
    <>
      <div id="viewControls">
        <img src="/src/assets/back.png" alt="left" onClick={() => changeScreen(1)}></img>
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

  const changeScreen = (screenInt) => {
    setCurrentScreen(screenInt)
    console.log(`Changing to screen: ${screenInt}`)
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
