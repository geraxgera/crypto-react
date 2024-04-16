import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

// Define a style object for the content
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

// Define a functional component called AppContent
export default function AppContent() {
  // Use the useCrypto hook to access the assets and crypto state
  const { assets, crypto } = useCrypto()

  // Create a cryptoPriceMap object that maps crypto ids to their prices
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  // Return the JSX for the component
  return (
    <Layout.Content style={contentStyle}>
      {/* Display the portfolio value */}
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
         .map((asset) => asset.amount * cryptoPriceMap[asset.id])
         .reduce((acc, v) => (acc += v), 0)
         .toFixed(2)}
        $
      </Typography.Title>
      {/* Render the PortfolioChart component */}
      <PortfolioChart />
      {/* Render the AssetsTable component */}
      <AssetsTable />
    </Layout.Content>
  )
}
