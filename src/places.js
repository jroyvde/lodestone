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

const ambienceGlob = import.meta.glob(`./assets/*_ambience.webm`, { eager: true, import: 'default' })
export const mapsGlob = import.meta.glob(`./assets/*_map.webp`, { eager: true, import: 'default' })

import { lollipop, prismCup } from "./easterEggs"

export const places = []
export const ambiencePlayersUrls = {}

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
        this.photo = `/lodestone-photo/assets/${name.replaceAll(' ', '_')}_photo.webp`
        this.ambience = ambienceGlob[`./assets/${name}_ambience.webm`]
        this.mapSvg = mapsGlob[`./assets/${name}_map.webp`] // Using webp for now to avoid performance issues with svg
        // Push to array
        places.push(this)
        // Add ambience to the Tone Players config
        ambiencePlayersUrls[this.name] = this.ambience
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
        { x: 310, y: 710, text: "There really is something different about this one." }
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
        { x: 480, y: 550, text: "It's over, isn't it." }
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
        { x: 445, y: 720, text: "Can something already rotted away ever regain its form? If you wanted, you could have made me believe it." }
    ],
    easterEggs: [],
})

// St Kilda Rd
const stKildaRd = new Place ({
    name: "St Kilda Rd",
    location: "Melbourne, Australia",
    lat: -37.825328,
    long: 144.970986,
    markers: [
        { x: 715, y: 405, text: "That last walk felt so long. Hand in hand, yet never further apart." }
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
        { x: 1200, y: 760, text: "When I looked up, I'd already seen her for the last time." }
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
        { x: 205, y: 715, text: "It's what the me I want to be would do." }
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
        { x: 425, y: 700, text: "Happiness lives wherever you can dare to look for it." },
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
        { x: 680, y: 675, text: "It doesn't feel like the present anymore. When have I ended up?" }
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
        { x: 800, y: 610, text: "Everything you know and love will be swallowed up in the end. Isn't it beautiful?" }
    ],
    easterEggs: [],
})

// Building 8 (big hat at 37%?)
const building8 = new Place ({
    name: "Building 8",
    location: "Melbourne, Australia",
    lat: -37.807872,
    long: 144.963558,
    markers: [
        { x: 705, y: 835, text: "Don't let your imagination be finite. Let it expand infinitely in every direction." },
        { x: 275, y: 640, text: "Metamorphosis is the only constant. I am not me." },
        { x: 905, y: 705, text: "From roses, I weave my heart. I feel blue, but like the sky." }
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
        { x: 770, y: 645, text: "The bird could only see the feathers that didn't match. So he didn't join the flock." }
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
        { x: 795, y: 590, text: "A meaningless question with two answers. Either one only proves how weak I am." }
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
        { x: 245, y: 410, text: "Maybe I'm not so bad after all. Then again." }
    ],
    easterEggs: [prismCup],
})

// Ritsumeikan University Osaka Ibaraki Campus
const ritsumeikanUniversityOic = new Place ({
    name: "Ritsumeikan University OIC",
    location: "Ibaraki, Osaka, Japan",
    lat: -34.80965,
    long: 135.561914,
    markers: [
        { x: 960, y: 430, text: "" },
        { x: 685, y: 565, text: "" }
    ],
    easterEggs: [],
})

// OIC Seminar House
const oicSeminarHouse = new Place ({
    name: "OIC Seminar House",
    location: "Ibaraki, Osaka, Japan",
    lat: -34.809931,
    long: 135.561622,
    markers: [
        { x: 900, y: 850, text: "" },
        { x: 1120, y: 530, text: "" },
    ],
    easterEggs: [],
})

// Kaikatsu Club Tenrokuten
const kaikatsuClubTenrokuten = new Place ({
    name: "Kaikatsu Club Tenrokuten",
    location: "Kita Ward, Osaka, Japan",
    lat: -34.710419,
    long: 135.510997,
    markers: [
        { x: 445, y: 810, text: "" }
    ],
    easterEggs: [],
})

// Building H
const buildingH = new Place ({
    name: "Building H",
    location: "Ibaraki, Osaka, Japan",
    lat: -34.808792,
    long: 135.561694,
    markers: [
        { x: 945, y: 670, text: "" }
    ],
    easterEggs: [],
})

// Nishichujocho
const nishichujocho = new Place ({
    name: "Nishichujocho",
    location: "Ibaraki, Osaka, Japan",
    lat: -34.812803,
    long: 135.562381,
    markers: [
        { x: 425, y: 710, text: "" }
    ],
    easterEggs: [],
})

// Shirakawa Hachiman Shrine
const shirakawaHachimanShrine = new Place ({
    name: "Shirakawa Hachiman Shrine",
    location: "Shirakawa, Gifu, Japan",
    lat: -36.255483,
    long: 136.905336,
    markers: [
        { x: 905, y: 835, text: "" }
    ],
    easterEggs: [],
})

// Roppongi Hills
const roppongiHills = new Place ({
    name: "Roppongi Hills",
    location: "Minato, Tokyo, Japan",
    lat: -35.661239,
    long: 139.729664,
    markers: [
        { x: 965, y: 775, text: "" }
    ],
    easterEggs: [],
})

// Greeves St
const greevesSt = new Place ({
    name: "Greeves St",
    location: "Fitzroy, Australia",
    lat: 0,
    long: 0,
    markers: [
       
    ],
    easterEggs: [],
})