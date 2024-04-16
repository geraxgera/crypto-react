import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

// Define a custom header style
const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

// Export the AppHeader component
export default function AppHeader() {
  // Initialize state variables
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)

  // Use the crypto context to access the crypto state
  const { crypto } = useCrypto()

  // Add an event listener for the '/' keypress to toggle the select dropdown
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) =>!prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  // Handle the select dropdown change event
  function handleSelect(value) {
    // Find the selected coin in the crypto state and set it as the current coin
    setCoin(crypto.find((c) => c.id === value))
    // Open the coin info modal
    setModal(true)
  }

// Render the AppHeader component
  return (
    <Layout.Header style={headerStyle}>
      {/* Render the select dropdown */}
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) =>!prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              atl={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />

      {/* Render the add asset button */}
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      {/* Render the coin info modal */}
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      {/* Render the add asset drawer */}
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}