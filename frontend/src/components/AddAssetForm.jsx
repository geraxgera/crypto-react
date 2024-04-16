import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd' // Importing necessary components from antd library
import { useState, useRef } from 'react' // Importing useState and useRef hooks from React
import { useCrypto } from '../context/crypto-context' // Importing useCrypto custom hook from crypto-context
import CoinInfo from './CoinInfo' // Importing CoinInfo component

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm() // Using Form's useForm hook to manage form state
  const { crypto, addAsset } = useCrypto() // Destructuring crypto and addAsset from useCrypto hook
  const [coin, setCoin] = useState(null) // Initializing coin state with null
  const [submitted, setSubmitted] = useState(false) // Initializing submitted state with false
  const assetRef = useRef() // Creating a ref to store the new asset

  if (submitted) { // If the form is submitted
    return (
      <Result // Displaying a success result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) { // If coin is not selected
    return (
      <Select // Displaying a Select component to choose a coin
        style={{
          width: '100%',
        }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    )
  }

  function onFinish(values) { // On form submission
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d?? new Date(),
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }

  function handleAmountChange(value) { // On amount input change
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  function handlePriceChange(value) { // On price input change
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} /> // Displaying coin information
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}