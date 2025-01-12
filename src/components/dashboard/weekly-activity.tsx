import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "end" as const,
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        color: "#6B7280",
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1A1D1F",
      padding: 12,
      titleFont: {
        size: 14,
        weight: "500",
      },
      bodyFont: {
        size: 14,
      },
      bodySpacing: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#6B7280",
        font: {
          size: 14,
        },
        padding: 8,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        color: "#F1F5F9",
        lineWidth: 1,
      },
      ticks: {
        color: "#6B7280",
        font: {
          size: 14,
        },
        padding: 12,
        stepSize: 100,
        callback: (value: number) => value,
      },
      min: 0,
      max: 500,
    },
  },
};

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Withdraw",
      data: [450, 340, 320, 380, 150, 350, 380],
      backgroundColor: "#1A1D1F",
      borderRadius: 100,
      borderSkipped: false,
      barPercentage: 0.5,
      categoryPercentage: 0.7,
    },
    {
      label: "Deposit",
      data: [220, 120, 250, 350, 230, 230, 330],
      backgroundColor: "#2563EB",
      borderRadius: 100,
      borderSkipped: false,
      barPercentage: 0.5,
      categoryPercentage: 0.7,
    },
  ],
};

export function WeeklyActivity({ className, ...props }: WeeklyActivityProps) {
  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">Weekly Activity</h2>

      <Card className="mt-4 h-[320px] md:mt-6">
        <div className="h-full w-full">
          <Bar options={options} data={data} />
        </div>
      </Card>
    </div>
  );
}
