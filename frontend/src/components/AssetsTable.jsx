import { Table } from 'antd' // Importing the Table component from antd library
import { useCrypto } from '../context/crypto-context' // Importing the useCrypto hook from crypto-context

// Defining the columns for the Table component
const columns = [
  {
    title: 'Name', // Column title
    dataIndex: 'name', // Data index for the name property
    sorter: (a, b) => a.name.length - b.name.length, // Function to sort by name length
    sortDirections: ['descend'], // Sort direction
  },
  {
    title: 'Price, $', // Column title
    dataIndex: 'price', // Data index for the price property
    defaultSortOrder: 'descend', // Default sort order
    sorter: (a, b) => a.price - b.price, // Function to sort by price
  },
  {
    title: 'Amount', // Column title
    dataIndex: 'amount', // Data index for the amount property
    defaultSortOrder: 'descend', // Default sort order
    sorter: (a, b) => a.amount - b.amount, // Function to sort by amount
  },
]

export default function AssetsTable() {
  // Using the useCrypto hook to get the assets state
  const { assets } = useCrypto()

  // Mapping the assets state to the data format required by the Table component
  const data = assets.map((a) => ({
    key: a.id, // Unique key for each row
    name: a.name, // Name property
    price: a.price, // Price property
    amount: a.amount, // Amount property
  }))

  // Returning the Table component with the defined columns and data
  return <Table pagination={false} columns={columns} dataSource={data} />
}