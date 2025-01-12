import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import App from "./App.tsx";
import "./index.css";

Chart.register(ChartDataLabels);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
