// Contains information about the accessible Places

// name:        Name of the Place, displayed on the Map Screen
// location:    Location of the Place, displayed on the Map Screen
// lat:         Latitude
// long:        Longitude
// distance:    Calculated distance, based on latitude and longitude
// proximity:   Averaged value between 0 and 1, based on distance (in relation to all other Places)
// photo:       Main image displayed on the View Screen
// markerPos:   Position of the "Marker" on the photo image (in pixels, converted to a percentage in code)
// ambience:    Ambience audio
// mapImg:      Image displayed on the Map Screen (Possibly temporary)

export const places = []

class Place {
    constructor({ name, location, lat, long, markers }) {
        // Set properties
        this.name = name
        this.location = location
        this.lat = lat
        this.long = long
        this.markers = markers
        this.distance = null
        this.proximity = null
        this.photo = `/assets/${name}_photo.webp`
        this.ambience = `/assets/${name}_ambience.webm`
        this.mapSvg = `/assets/${name}_map.svg`
        // Push to array
        places.push(this)
    }
}

const building9 = new Place ({
    name: "Building 9",
    location: "Melbourne, Australia",
    lat: -37.807222,
    long: 144.964444,
    markers: [
        { x: 205, y: 715, text: ""}
    ]
})

const gardenBuilding = new Place ({
    name: "Garden Building",
    location: "Melbourne, Australia",
    lat: -37.808056,
    long: 144.964167,
    markers: [
        { x: 425, y: 700, text: ""}
    ]
})

const meatMarketStables = new Place ({
    name: "Meat Market Stables",
    location: "North Melbourne, Australia",
    lat: -37.801111,
    long: 144.953333,
    markers: [
        { x: 770, y: 645, text: ""}
    ]
})