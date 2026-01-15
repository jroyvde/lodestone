// Simple function to "wait" a specified period
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Linear interpolation
export const lerp = (x, y, a) => x * (1 - a) + y * a

// Preload and decode image
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src

    img.onload = async () => {
      if (img.decode) {
        try {
          await img.decode()
        } catch {}
      }
      resolve()
    }

    img.onerror = reject
  })
}