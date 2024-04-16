// Importing cryptoAssets and cryptoData from the data module
import { cryptoAssets, cryptoData } from './data'

// Function fakeFetchCrypto returns a Promise that resolves with cryptoData after a 1-second delay
export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1000)
  })
}

// Function fetchAssets returns a Promise that resolves with cryptoAssets after a 1-second delay
export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1000)
  })
}