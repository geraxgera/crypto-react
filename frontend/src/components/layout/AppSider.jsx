import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'

// Define a style object for the sider
const siderStyle = {
  padding: '1rem',
}

// Export the AppSider component
export default function AppSider() {
  // Use the useContext hook to access the CryptoContext
  const { assets } = useContext(CryptoContext)

  // Return a Layout.Sider component with a width of 25% and the defined style
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {/* Map over the assets array and render a Card component for each asset */}
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          {/* Render a Statistic component with the asset's id, totalAmount, and grow properties */}
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow? '#3f8600' : '#cf1322' }}
            prefix={asset.grow? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          {/* Render a List component with a small size and a data source containing the asset's totalProfit, amount, and growPercent properties */}
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              // { title: 'Difference', value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                {/* Render the item's title */}
                <span>{item.title}</span>
                {/* Render the item's value, with a Tag component if withTag is true, and a Typography.Text component if isPlain is false */}
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}