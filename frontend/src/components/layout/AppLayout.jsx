// Import necessary libraries and components
import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

// Define the main AppLayout component
export default function AppLayout() {
  // Use the useContext hook to access the CryptoContext
  const { loading } = useContext(CryptoContext);

  // If the loading state is true, display a fullscreen spinner
  if (loading) {
    return <Spin fullscreen />;
  }

  // Otherwise, render the main layout of the application
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
