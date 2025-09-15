import * as Tone from "tone"

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Sampler
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sampler = new Tone.Sampler({
    urls: {
        D2: "mel_low_d.wav",
        C3: "four.m4a",
    },
    baseUrl: "./assets/audioSamples/"
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
  grind.chain(grindPitch, grindFilter, grindCrush, grindVolume, Tone.getDestination())
}

export const playGrind = () => {
  grind.triggerAttack()
}

export const setGrindVol = (newVol) => {
  grindVolume.volume.rampTo(newVol, 2)
}

export const playBackSound = () => {

}

export const playSound = (sound) => {
  switch (sound) {
    case "nav":
      polySynth.triggerAttackRelease("C4", "8n")    // Placeholder
      break
    case "go":
      polySynth.triggerAttackRelease("C4", "8n")    // Placeholder
      break
    case "back":
      polySynth.triggerAttackRelease("C4", "8n")    // Placeholder
      break
    case "marker":
      polySynth.triggerAttackRelease("C4", "8n")    // Placeholder
      break
  }
}