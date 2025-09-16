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

const botanicalGardens = {
    name: "Royal Botanic Gardens Victoria",
    location: "Melbourne, Australia",
    lat: -37.825,
    long: 144.971,
    distance: null,
    proximity: null,
    photo: "/assets/photo0.webp",
    markerPos: {
        x: 215,
        y: 565,
    },
    ambience: "/assets/ambience0.opus",
    mapImg: "/assets/map0.webp",
}

const blackBox = {
    name: "Building 22",
    location: "Melbourne, Australia",
    lat: -37.809,
    long: 144.964,
    distance: null,
    proximity: null,
    photo: "/assets/photo1.webp",
    markerPos: {
        x: 700,
        y: 795,
    },
    ambience: "/assets/ambience1.opus",
    mapImg: "/assets/map1.webp",
}

const oldArtsBuilding = {
    name: "Old Arts Building",
    location: "Parkville, Australia",
    lat: -37.798,
    long: 144.960,
    distance: null,
    proximity: null,
    photo: "/assets/photo2.webp",
    markerPos: {
        x: 380,
        y: 530,
    },
    ambience: "/assets/ambience2.opus",
    mapImg: "/assets/map2.webp",
}

export const places = [ botanicalGardens, blackBox, oldArtsBuilding ]