// A functional component in React that displays coin information
import { Flex, Typography } from 'antd'

export default function CoinInfo({ coin, withSymbol }) {
  // Return a Flex container with an image and a title
  return (
    <Flex align="center">
      <img
        src={coin.icon} // Source of the coin's icon
        alt={coin.name} // Alternative text for the icon
        style={{ width: 40, marginRight: 10 }} // Width and margin-right styles for the icon
      />
      <Typography.Title level={2} style={{ margin: 0 }}> // Title for the coin name
        {withSymbol && <span>({coin.symbol})</span>} // Optional symbol for the coin
        {coin.name} // Name of the coin
      </Typography.Title>
    </Flex>
  )
}