import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseStatisticsProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Array<{
    label: string;
    value: number;
  }>;
}

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      color: "#FFFFFF",
      font: {
        weight: "bold",
        size: 14,
      },
      formatter: (value: number, context: any) => {
        return `${context.chart.data.labels[context.dataIndex]}\n${value}%`;
      },
      textAlign: "center",
      display: true,
    },
  },
  layout: {
    padding: 20,
  },
};

const defaultData = [
  { label: "Entertainment", value: 30 },
  { label: "Bill Expense", value: 15 },
  { label: "Investment", value: 20 },
  { label: "Others", value: 35 },
];

export function ExpenseStatistics({
  data = defaultData,
  className,
  ...props
}: ExpenseStatisticsProps) {
  const chartData: ChartData<"pie"> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#312E81", // Entertainment (Navy)
          "#F97316", // Bill Expense (Orange)
          "#2563EB", // Investment (Blue)
          "#1A1D1F", // Others (Black)
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">
        Expense Statistics
      </h2>

      <Card className="mt-4 h-[320px] md:mt-6">
        <div className="h-full w-full">
          <Pie data={chartData} options={options} />
        </div>
      </Card>
    </div>
  );
}
