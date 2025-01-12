import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: string;
  icon: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
}

interface RecentTransactionsProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: Transaction[];
}

export function RecentTransactions({
  transactions,
  className,
  ...props
}: RecentTransactionsProps) {
  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-xl font-semibold text-[#1A1D1F]">
        Recent Transaction
      </h2>

      <Card className="mt-4 h-[235px] overflow-auto md:mt-6">
        <div>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 mb-6 last:mb-0"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  transaction.type === "credit"
                    ? "bg-[#E7F1FF]"
                    : "bg-[#FFF3E5]"
                )}
              >
                <img src={transaction.icon} alt="" className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-[#1B2559]">
                  {transaction.title}
                </h3>
                <p className="text-sm text-[#6B7280]">{transaction.date}</p>
              </div>

              <p
                className={cn(
                  "text-lg font-medium",
                  transaction.type === "credit"
                    ? "text-[#16A34A]"
                    : "text-[#DC2626]"
                )}
              >
                {transaction.type === "credit" ? "+" : "-"}$
                {Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
