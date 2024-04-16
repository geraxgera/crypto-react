// Import necessary dependencies
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the PortfolioChart component
export default function PortfolioChart() {
  // Use the useCrypto hook to access the assets state
  const { assets } = useCrypto();

  // Define the data for the chart
  const data = {
    labels: assets.map((a) => a.name), // Use the name of each asset as a label
    datasets: [
      {
        label: "$", // Label for the dataset
        data: assets.map((a) => a.totalAmount), // Use the totalAmount of each asset as data
        backgroundColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(48, 73, 184, 0.68)",
          "rgba(7, 73, 255, 0.8)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  // Return the Pie chart component with the defined data
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}