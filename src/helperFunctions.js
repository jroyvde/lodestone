// Simple function to "wait" a specified period
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}