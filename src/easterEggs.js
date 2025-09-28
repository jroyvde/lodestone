class easterEgg {
    constructor({ alt, pos, img, onClick }) {
        this.alt = alt
        this.pos = pos
        this.img = img
        this.onClick = onClick
    }
}

export const lollipop = new easterEgg({
    alt: "lollipop",
    pos: { x: 915, y: 645 },
    img: "/assets/marker.webp",
    onClick: () => {
        console.log(`${lollipop.alt} clicked.`)
    },
})

export const prismCup = new easterEgg({
    alt: "prismCup",
    pos: { x: 435, y: 640 },
    img: "/assets/marker.webp",
    onClick: () => {
        console.log(`${prismCup.alt} clicked.`)
    },
})