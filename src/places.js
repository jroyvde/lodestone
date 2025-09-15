// Contains information about the accessible Places

// name:        Name of the Place, displayed on the Map Screen
// location:    Location of the Place, displayed on the Map Screen
// lat:         Latitude
// long:        Longitude
// distance:    Calculated distance, based on latitude and longitude
// proximity:   Averaged value between 0 and 1, based on distance (in relation to all other Places)
// photo:       Main image displayed on the View Screen
// markerPos:   Position of the "Marker" on the photo image
// mapImg:      Image displayed on the Map Screen (Possibly temporary)

const botanicalGardens = {
    name: "Botanical Gardens",
    location: "Melbourne, Australia",
    lat: -37.825,
    long: 144.971,
    distance: null,
    proximity: null,
    photo: "/src/assets/photo0.jpg",
    markerPos: {
        x: 0,
        y: 0,
    },
    mapImg: "/src/assets/map0.webp",
}

const blackBox = {
    name: "Black Box",
    location: "Melbourne, Australia",
    lat: -37.809,
    long: 144.964,
    distance: null,
    proximity: null,
    photo: "/src/assets/photo1.jpg",
    markerPos: {
        x: 0,
        y: 0,
    },
    mapImg: "/src/assets/map1.webp",
}

const oldArtsBuilding = {
    name: "Old Arts Building",
    location: "Parkville, Australia",
    lat: -37.798,
    long: 144.960,
    distance: null,
    proximity: null,
    photo: "/src/assets/photo2.jpg",
    markerPos: {
        x: 0,
        y: 0,
    },
    mapImg: "/src/assets/map2.webp",
}

export const places = [ botanicalGardens, blackBox, oldArtsBuilding ]