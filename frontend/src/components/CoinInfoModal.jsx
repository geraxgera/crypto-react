import { Flex, Tag, Typography, Divider } from 'antd'
import CoinInfo from './CoinInfo'

// The CoinInfoModal component displays detailed information about a cryptocurrency coin
export default function CoinInfoModal({ coin }) {
  // The component returns a JSX element that contains the following information:
  // - The coin's name and symbol (using the CoinInfo component)
  // - The coin's price change over the past 1 hour, 1 day, and 1 week
  // - The coin's current price in USD and BTC
  // - The coin's market cap
  // - The coin's contract address (if it exists)
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0? 'green' : 'red'}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0? 'green' : 'red'}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0? 'green' : 'red'}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  )
}