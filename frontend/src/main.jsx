// Import the necessary functions and components
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Get the root element from the HTML document
const root = document.getElementById('root')

// Create a root for React to render the App component
createRoot(root).render(<App />)