import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData,
  ScriptableContext,
} from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface BalanceHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: {
    labels: string[];
    data: number[];
  };
}

type ChartDataType = ChartData<"line", number[], string>;
type ChartOptionsType = ChartOptions<"line">;

const defaultData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  data: [300, 250, 450, 500, 750, 250, 600],
};

const options: ChartOptionsType = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#1A1D1F",
      titleFont: {
        size: 13,
      },
      bodyFont: {
        size: 13,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return `$${context.parsed.y}`;
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index" as const,
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
        color: "#94A3B8",
        font: {
          size: 13,
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
        color: "#94A3B8",
        font: {
          size: 13,
        },
        padding: 12,
        stepSize: 200,
        callback: function (value) {
          return `$${value}`;
        },
      },
      min: 0,
      max: 800,
      beginAtZero: true,
    },
  },
};

export function BalanceHistory({
  data = defaultData,
  className,
  ...props
}: BalanceHistoryProps) {
  const chartData: ChartDataType = {
    labels: data.labels,
    datasets: [
      {
        fill: true,
        data: data.data,
        borderColor: "#2563EB",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.15)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
          return gradient;
        },
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#2563EB",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">Balance History</h2>

      <Card className="mt-4 h-[276px] md:mt-6">
        <div className="h-full w-full">
          <Line options={options} data={chartData} />
        </div>
      </Card>
    </div>
  );
}
