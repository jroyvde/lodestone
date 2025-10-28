import * as Tone from "tone"
import { ambiencePlayersUrls } from "./places"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Synthesizers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const polySynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 10,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  },
})

const boop = new Tone.Synth({
  oscillator: {
    type: "triangle",
  },
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Noise Generators
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const grind = new Tone.NoiseSynth({
  noise: { type: "white" },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 1.0,
  },
})

const trans = new Tone.NoiseSynth({
  noise: {
    type: "white",
  },
  envelope: {
    attack: 2.0,
    decay: 0.1,
    sustain: 1.0,
    release: 2.0
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Sampler
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sampler = new Tone.Sampler({
    urls: {
        D2: "mel_low_d.wav",
        C3: "four.m4a",
    },
    baseUrl: "./assets/audioSamples/",
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Player
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ambience = new Tone.Players({
  urls: ambiencePlayersUrls,
  onload: () => {
    Object.keys(ambiencePlayersUrls).forEach((name) => {
      ambience.player(`${name}`).loop = true;
    })
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Audio Effects
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// For "polySynth"

const filter = new Tone.Filter(20000, "lowpass")

const distortion = new Tone.Distortion(0)

const reverb = new Tone.Reverb(2)

const meter = new Tone.Meter()
meter.smoothing = 0.1

// For "boop"


// For "grind"

const grindPitch = new Tone.PitchShift({
    pitch: -120,
})

const grindCrush = new Tone.BitCrusher({
    bits: 8,
})

const grindFilter = new Tone.Filter(200, "bandpass")

const grindVolume = new Tone.Volume({
    volume: -60,
})

// For "trans"

const transCrush = new Tone.BitCrusher({
    bits: 8,
})

const transVolume = new Tone.Volume({
    volume: -24,
})

// For "ambience"

export const ambienceCrush = new Tone.BitCrusher({
    bits: 10,
})

const ambienceVolume = new Tone.Volume({
    volume: 0,
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////// Init Function
// This gets triggered when the user closes the dialog element
// It will connect the polysynth => filter => distortion => meter => audio output
export const toneInit = () => {
  polySynth.chain(filter, distortion, reverb, meter, Tone.getDestination())
  // This is an alternative statement if the sampler is instead chosen : the only difference is the variable name
  // The sampler above must be uncommented for this to work, as well as the declaration on line 3 of keyboardController.js
  // sampler.chain(filter, distortion, meter, Tone.Destination)
  boop.chain(Tone.getDestination())
  grind.chain(grindPitch, grindFilter, grindCrush, grindVolume, Tone.getDestination())
  trans.chain(transCrush, transVolume, Tone.getDestination())
  ambience.chain(ambienceCrush, ambienceVolume, Tone.getDestination())
}

export const playGrind = () => {
  grind.triggerAttack()
}

export const setGrindVol = (newVol) => {
  grindVolume.volume.rampTo(newVol, 2)
}

export const playTransNoise = () => {
  trans.triggerAttack()
}

export const stopTransNoise = () => {
  trans.triggerRelease()
}

export const playAmbience = (placeName) => {
  if (ambience.player(placeName).state === "stopped" && ambience.player(placeName).buffer.loaded) {
    ambience.player(placeName).start()
  }
}

export const stopAmbience = (placeName) => {
  if (ambience.player(placeName).state === "started") {
    ambience.player(placeName).stop()
  }
}

export const setAmbienceCrush = (crushBits) => {
  ambienceCrush.bits.value = crushBits
}

export const playSound = (sound) => {
  switch (sound) {
    case "enter":
      boop.triggerAttackRelease("B4", "16n")    // Placeholder
      break
    case "nav":
      boop.triggerAttackRelease("C4", "16n")    // Placeholder
      break
    case "go":
      boop.triggerAttackRelease("B4", "16n")    // Placeholder
      break
    case "back":
      boop.triggerAttackRelease("E3", "16n")    // Placeholder
      break
    case "marker":
      boop.triggerAttackRelease("C4", "16n")    // Placeholder
      break
  }
}