import { useState, useRef, useEffect } from 'react'

// Import functions
import { toneInit, playGrind, setGrindVol } from './toneSetup'
import { wait } from "./helperFunctions"

// Import components
import { Prism } from "./Prism"

// Import stylesheets
import 'normalize.css'
import './App.css'
import './PrismScreen.css'
import "./mapScreen.css"
import './Prism.css'

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
    const r = document.querySelector(":root")
    console.log("Entering the Prism")
    // Zoom in
    r.style.setProperty("--prism-scale", "2.0")
    await wait(1000)
    // Overlay

    // Set Current Screen to the Map Screen (1)
    changeScreen(1)
  }

  setGrindVol(-6)

  return(
    <>
      <IntroModal showIntroModal={showIntroModal} setShowIntroModal={setShowIntroModal} />
      <Prism onClick={enterPrism} currentScreen={currentScreen}/>
    </>
  )
}

// Screen 1: Map
const MapScreen = ({ changeScreen, currentScreen }) => {
  // Return to the Prism Screen
  const exitPrism = async () => {
    console.log("Returning to the Prism Screen")
    await wait(1000)
    changeScreen(0)
  }
  
  setGrindVol(-12)

  return(
    <>
      <div className="mapControls">
          
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
const ViewScreen = ({ changeScreen, currentScreen }) => {

  return(
    <>

    </>
  )
}

// App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0)       // Integer representing the current Screen
  const [showIntroModal, setShowIntroModal] = useState(true)  // Whether or not the Intro Modal should be rendered

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
              <MapScreen changeScreen={changeScreen} currentScreen={currentScreen}/>
            </main>
          )
    case 2:
          return(
            <main>
              <ViewScreen changeScreen={changeScreen} currentScreen={currentScreen}/>
            </main>
          )
  }
}

export default App
