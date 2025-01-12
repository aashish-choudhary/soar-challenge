import { CreditCard } from "@/components/ui/credit-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { ExpenseStatistics } from "@/components/dashboard/expense-statistics";
import { QuickTransfer } from "@/components/dashboard/quick-transfer";
import { BalanceHistory } from "@/components/dashboard/balance-history";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  useGetCardsQuery,
  useGetTransactionsQuery,
  useGetChartDataQuery,
} from "@/lib/store/services/api";

export function Dashboard() {
  const { data: cards, isLoading: isLoadingCards } = useGetCardsQuery();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery();
  const { data: chartData, isLoading: isLoadingChartData } =
    useGetChartDataQuery();

  if (isLoadingCards || isLoadingTransactions || isLoadingChartData) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden space-y-6 p-6 md:block">
        {/* First Row: My Cards (2/3) & Recent Transactions (1/3) */}
        <div className="flex gap-6">
          <div className="w-2/3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1A1D1F]">My Cards</h2>
              <Button
                variant="link"
                className="text-[#1A1D1F] hover:text-primary"
              >
                <span>See All</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-6">
              {cards?.slice(0, 2).map((card) => (
                <div className="w-1/2">
                  <CreditCard
                    key={card.id}
                    variant={card.variant}
                    balance={card.balance.toString()}
                    cardHolder={card.holder}
                    validThru={card.validThru}
                    cardNumber={card.number}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3">
            <RecentTransactions transactions={transactions || []} />
          </div>
        </div>

        {/* Second Row: Weekly Activity (2/3) & Expense Statistics (1/3) */}
        <div className="flex gap-6">
          <div className="w-2/3">
            <WeeklyActivity data={chartData?.weeklyActivity} />
          </div>
          <div className="w-1/3">
            <ExpenseStatistics data={chartData?.expenseStatistics} />
          </div>
        </div>

        {/* Third Row: Quick Transfer (1/3) & Balance History (2/3) */}
        <div className="flex gap-6">
          <div className="w-2/5">
            <QuickTransfer />
          </div>
          <div className="w-3/5">
            <BalanceHistory data={chartData?.balanceHistory} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="space-y-6 p-4 md:hidden bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1A1D1F]">My Cards</h2>
            <Button
              variant="link"
              className="text-[#1A1D1F] hover:text-primary"
            >
              <span>See All</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {cards?.[0] && (
            <CreditCard
              variant={cards[0].variant}
              balance={cards[0].balance.toString()}
              cardHolder={cards[0].holder}
              validThru={cards[0].validThru}
              cardNumber={cards[0].number}
            />
          )}
        </div>

        <RecentTransactions transactions={transactions || []} />
        <WeeklyActivity data={chartData?.weeklyActivity} />
        <ExpenseStatistics data={chartData?.expenseStatistics} />
        <QuickTransfer />
        <BalanceHistory data={chartData?.balanceHistory} />
      </div>
    </>
  );
}
