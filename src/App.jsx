import { useState } from 'react'

// Import functions
import { toneInit, playGrind, setGrindVol } from './toneSetup'
import { wait } from "./helperFunctions"

// Import components
import { Prism } from "./Prism"

// Import stylesheets
import 'normalize.css'
import './App.css'
import './PrismScreen.css'
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
      console.log("Entering the Prism")
      // Zoom in
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
      <div id="mapDisplay">

      </div>
      <div id="mapControls">
        
      </div>
      <Prism onClick={exitPrism} currentScreen={currentScreen}/>
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
  const [currentScreen, setCurrentScreen] = useState(0)

  // Whether or not the Intro Modal should be rendered
  const [showIntroModal, setShowIntroModal] = useState(true)

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
