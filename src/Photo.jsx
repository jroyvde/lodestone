import { useEffect, useRef } from "react"
import { Markers } from "./Markers"

export const Photo = ({ selectedPlace }) => {
    const patchRef = useRef(null)

    useEffect(() => {
        // Handle when patch is ready
        window.patchInitialized = (patch) => {
            patchRef.current = patch
        }

        // Cleanup
        return () => {
            window.patchInitialized = null
            patchRef.current = null
        }
    }, [])

    useEffect(() => {
        if (patchRef.current && selectedPlace) {
            patchRef.current.setVariable("proximity", selectedPlace.proximity)
        }
    }, [selectedPlace])

    return(
        <div id="photo">
            <iframe
                title="lodestone-photo"
                src={`${import.meta.env.BASE_URL}lodestone-photo/index.html`}
                sandbox="allow-scripts allow-same-origin"
            />
            <Markers selectedPlace={selectedPlace} />
        </div>
    )
}