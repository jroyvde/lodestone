// Simple function to "wait" a specified period
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Linear interpolation
export const lerp = (x, y, a) => x * (1 - a) + y * a