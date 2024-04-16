import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { percentDifference } from '../utils'

// Create a context object for managing crypto assets
const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

// Define a provider component for the context
export function CryptoContextProvider({ children }) {
  // Use the useState hook to manage the state of loading, crypto, and assets
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  // Define a function to map the assets array to a new array with additional properties
  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
       ...asset,
      }
    })
  }

  // Use the useEffect hook to fetch data from an API when the component is mounted
  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  // Define a function to add a new asset to the assets array
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
  }

  // Return the provider component with the context value
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

// Export the context object and the provider component
export default CryptoContext

// Define a custom hook to access the context object
export function useCrypto() {
  return useContext(CryptoContext)
}