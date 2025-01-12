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

interface ExpenseStatisticsProps extends React.HTMLAttributes<HTMLDivElement> {}

const data: ChartData<"pie"> = {
  labels: ["Entertainment", "Bill Expense", "Investment", "Others"],
  datasets: [
    {
      data: [30, 15, 20, 35],
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

export function ExpenseStatistics({
  className,
  ...props
}: ExpenseStatisticsProps) {
  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">
        Expense Statistics
      </h2>

      <Card className="mt-4 h-[320px] md:mt-6">
        <div className="h-full w-full">
          <Pie data={data} options={options} />
        </div>
      </Card>
    </div>
  );
}
