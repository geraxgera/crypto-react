// Import the AppLayout component from the './components/layout/AppLayout' file
import AppLayout from './components/layout/AppLayout';

// Import the CryptoContextProvider component from the './context/crypto-context' file
import { CryptoContextProvider } from './context/crypto-context';

// Export the App component as the default export
export default function App() {
  // Wrap the AppLayout component with the CryptoContextProvider
  return (
    <CryptoContextProvider>
      {/* Render the AppLayout component */}
      <AppLayout />
    </CryptoContextProvider>
  );
}