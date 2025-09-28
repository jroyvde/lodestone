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
        // Clicking the basketball hoop triggers an animation where a ball is tossed in.
        // The hoop shrinks away, and is replaced by a lollipop.
    },
})

export const prismCup = new easterEgg({
    alt: "prismCup",
    pos: { x: 435, y: 640 },
    img: "/assets/marker.webp",
    onClick: () => {
        console.log(`${prismCup.alt} clicked.`)
        // Plays a sound effect like ice and water in a cup.
    },
})