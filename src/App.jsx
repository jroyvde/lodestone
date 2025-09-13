import { useState } from 'react'

import { toneInit, playGrind, stopGrind } from './toneSetup'
import { wait } from "./helperFunctions"

import 'normalize.css'
import './App.css'
import './PrismScreen.css'
import './Prism.css'

// Screen 0: Prism
const PrismScreen = ({ changeScreen }) => {
    const enterPrism = async () => {
      console.log("Entering the Prism")
      // Zoom in
      await wait(1000)
      // Overlay

      // Set Current Screen to the Map Screen (1)
      changeScreen(1)
  }

  return(
    <>
      <IntroModal />
      <Prism enterPrism={enterPrism}/>
    </>
  )
}

const IntroModal = () => {
  // Whether or not the modal should be rendered
  const [renderModal, setRenderModal] = useState(true)

  if (renderModal) {
    return(
      <div id="intro-modal-background" onClick={ () => { setRenderModal(false) ; toneInit() ; playGrind() } }>
        <div id="intro-modal">
          <p>Click to begin</p>
        </div>
      </div>
    )
  }
}

const Prism = ({ enterPrism }) => {
  const speedX = 0
  const speedY = 0.05
  const speedZ = 0

  // Rotate the Prism once the page is loaded
  document.addEventListener("DOMContentLoaded", () => {
    const prism = document.querySelector("#prism")

    let angleX = 0
    let angleY = 0
    let angleZ = 0

    function rotatePrism() {
      angleX += speedX
      angleY += speedY
      angleZ += speedZ
      prism.style.transform =
          `rotateX(${angleX}deg) 
          rotateY(${angleY}deg)
          rotateZ(${angleZ}deg)`
      requestAnimationFrame(rotatePrism)
    }

    rotatePrism()
  })

  // Enter the Prism and transition to the Map Screen


  return(
    <div id="prism-container">
      <div id="prism" onClick={ () => enterPrism() }>
        <div className="face front" />
        <div className="face back" />
        <div className="face top" />
        <div className="face bottom" />
        <div className="face left" />
        <div className="face right" />
      </div>
    </div>
  )
}

// Screen 1: Map
const MapScreen = () => {
  stopGrind()

  return(
    <>

    </>
  )
}

// Screen 2: View
const ViewScreen = () => {

}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0)

  const changeScreen = (screenInt) => {
    setCurrentScreen(screenInt)
    console.log(`Changing to screen: ${screenInt}`)
  }

  switch (currentScreen) {
    case 0:
          return(
            <main>
              <PrismScreen changeScreen={changeScreen}/>
            </main>
          )
    case 1:
          return(
            <main>
              <MapScreen changeScreen={changeScreen}/>
            </main>
          )
    case 2:
          return(
            <main>
              <ViewScreen changeScreen={changeScreen}/>
            </main>
          )
  }
}

export default App
