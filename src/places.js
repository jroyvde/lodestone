// Contains information about the accessible Places

// name:        Name of the Place, displayed on the Map Screen
// location:    Location of the Place, displayed on the Map Screen
// lat:         Latitude
// long:        Longitude
// distance:    Calculated distance, based on latitude and longitude
// proximity:   Averaged value between 0 and 1, based on distance (in relation to all other Places)
// photo:       Main image displayed on the View Screen
// markers:     Array of "Markers" on the photo image, stored as objects
// easterEggs:  Array of "Easter Egg" objects on the photo image
// ambience:    Ambience audio
// mapImg:      Image displayed on the Map Screen (Possibly temporary)

import { lollipop, prismCup } from "./easterEggs"

export const places = []
export const ambiencePlayersConfig = {}

class Place {
    constructor({ name, location, lat, long, markers, easterEggs }) {
        // Set properties
        this.name = name
        this.location = location
        this.lat = lat
        this.long = long
        this.markers = markers
        this.easterEggs = easterEggs
        this.distance = null
        this.proximity = null
        this.active = false
        this.photo = `/assets/${name}_photo.webp`
        this.ambience = `/assets/${name}_ambience.webm`
        this.mapSvg = `/assets/${name}_map.webp` // Using webp for now to avoid performance issues with svg
        // Push to array
        places.push(this)
        // Add ambience to the Tone Players config
        ambiencePlayersConfig[this.name] = this.ambience
        console.log(`${this.name}: ${this.ambience}`)
    }
}

// Point Ormond Lookout
const pointOrmondLookout = new Place ({
    name: "Point Ormond Lookout",
    location: "Elwood, Australia",
    lat: -37.881933,
    long: 144.976311,
    markers: [
        { x: 310, y: 710, text: ""}
    ],
    easterEggs: [],
})

// Le Bon Ton
const leBonTon = new Place ({
    name: "Le Bon Ton",
    location: "Collingwood, Australia",
    lat: -37.804822,
    long: 144.988569,
    markers: [
        { x: 480, y: 550, text: ""}
    ],
    easterEggs: [],
})

// Royal Botanic Gardens Victoria
const royalBotanicGardensVictoria = new Place ({
    name: "Royal Botanic Gardens Victoria",
    location: "Melbourne, Australia",
    lat: -37.832047,
    long: 144.97855,
    markers: [
        { x: 445, y: 720, text: ""}
    ],
    easterEggs: [],
})

// St Kilda Rd
const stKildaRd = new Place ({
    name: "St Kilda Rd",
    location: "Melbourne, Australia",
    lat: 0,
    long: 0,
    markers: [
        { x: 0, y: 0, text: ""}
    ],
    easterEggs: [],
})

// Flinders Street Station
const flindersStreetStation = new Place ({
    name: "Flinders Street Station",
    location: "Melbourne, Australia",
    lat: -37.818153,
    long: 144.966561,
    markers: [
        { x: 1200, y: 760, text: ""}
    ],
    easterEggs: [],
})

// Building 9
const building9 = new Place ({
    name: "Building 9",
    location: "Melbourne, Australia",
    lat: -37.807222,
    long: 144.964444,
    markers: [
        { x: 205, y: 715, text: "" }
    ],
    easterEggs: [],
})

// Garden Building
const gardenBuilding = new Place ({
    name: "Garden Building",
    location: "Melbourne, Australia",
    lat: -37.808056,
    long: 144.964167,
    markers: [
        { x: 425, y: 700, text: ""},
    ],
    easterEggs: [],
}) // Check position

// University of Melbourne
const universityOfMelbourne = new Place ({
    name: "University of Melbourne",
    location: "Parkville, Australia",
    lat: -37.797975,
    long: 144.959711,
    markers: [
        { x: 680, y: 675, text: ""}
    ],
    easterEggs: [],
})

// Royal Exhibition Building
const royalExhibitionBuilding = new Place ({
    name: "Royal Exhibition Building",
    location: "Carlton, Australia",
    lat: -37.804711,
    long: 144.972508,
    markers: [
        { x: 800, y: 610, text: ""}
    ],
    easterEggs: [],
})

// Building 8 (big hat at 37%?)
const building8 = new Place ({
    name: "Building 8",
    location: "Melbourne, Australia",
    lat: 0,
    long: 0,
    markers: [
        { x: 0, y: 0, text: ""}
    ],
    easterEggs: [],
})

// Meat Market Stables
const meatMarketStables = new Place ({
    name: "Meat Market Stables",
    location: "North Melbourne, Australia",
    lat: -37.801111,
    long: 144.953333,
    markers: [
        { x: 770, y: 645, text: ""}
    ],
    easterEggs: [],
})

// Hawke St
const hawkeSt = new Place ({
    name: "Hawke St",
    location: "West Melbourne, Australia",
    lat: -37.809167,
    long: 144.944444,
    markers: [
        { x: 795, y: 590, text: ""}
    ],
    easterEggs: [lollipop],
})

// Durham Rd
const durhamRd = new Place ({
    name: "Durham Rd",
    location: "Melbourne, Australia",
    lat: -37.834728,
    long: 145.089717,
    markers: [
        { x: 245, y: 410, text: ""}
    ],
    easterEggs: [prismCup],
})