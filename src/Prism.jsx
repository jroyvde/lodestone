import { useRef, useEffect } from 'react'

export const Prism = ({ currentScreen, onClick }) => {
    // Prism Reference
    const prismRef = useRef(null)

    // Rotation angles
    const rotAngle = useRef({
        x: 0,
        y: 0,
        z: 0,
    })

    // Rotation speeds
    const rotSpeed = useRef({
        x: 0,
        y: 0.1,
        z: 0,
    })

    useEffect(() => {
        // Get the Document :root so we can access CSS variables
        const r = document.querySelector(":root")
        // Set the Prism's correct size based on the current screen
        switch (currentScreen) {
            case 0:
                r.style.setProperty("--prism-scale", "1.0")
                break
            case 1:
                r.style.setProperty("--prism-scale", "0.2")
                break
            default:
                break
        }
    }, [currentScreen])

    // Rotate the Prism
    useEffect(() => {
        const rotatePrism = () => {
            const prism = prismRef.current
            if (!prism) return
            rotAngle.current.x += rotSpeed.current.x
            rotAngle.current.y += rotSpeed.current.y
            rotAngle.current.z += rotSpeed.current.z
            prism.style.transform =
                `rotateX(${rotAngle.current.x}deg) 
                rotateY(${rotAngle.current.y}deg)
                rotateZ(${rotAngle.current.z}deg)`
        }

        const interval = setInterval(rotatePrism, 10)
        return () => clearInterval(interval)
    }, [])

    return(
        <div id="prism-container">
            <div id="prism" ref={prismRef} onClick={ () => onClick() }>
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