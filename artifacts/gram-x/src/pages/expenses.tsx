import { useGetExpenses, getGetExpensesQueryKey, useGetExpenseSummary, getGetExpenseSummaryQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { IndianRupee, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const COLORS = ['#1B5E20', '#4CAF50', '#81C784', '#FF9800', '#FFB74D', '#A1887F', '#795548'];

export default function Expenses() {
  const { data: expenses, isLoading: expensesLoading } = useGetExpenses({ query: { queryKey: getGetExpensesQueryKey() } });
  const { data: summary, isLoading: summaryLoading } = useGetExpenseSummary({ query: { queryKey: getGetExpenseSummaryQueryKey() } });

  const chartData = summary?.byCategory.map(item => ({
    name: item.category,
    value: item.total
  })) || [];

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">Expenses</h1>
          <p className="text-sm text-muted-foreground">Track your farm's finances.</p>
        </div>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {summaryLoading ? (
        <Skeleton className="h-32 w-full rounded-xl" />
      ) : summary ? (
        <div className="grid grid-cols-2 gap-4">
           <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-4">
              <div className="text-sm font-medium flex items-center gap-1 opacity-90 mb-1">
                <TrendingUp className="w-4 h-4" /> Revenue
              </div>
              <div className="text-xl font-bold">₹{summary.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="text-sm font-medium flex items-center gap-1 text-muted-foreground mb-1">
                <TrendingDown className="w-4 h-4 text-destructive" /> Expenses
              </div>
              <div className="text-xl font-bold text-destructive">₹{summary.totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {summaryLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : chartData.length > 0 ? (
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        {expensesLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))
        ) : expenses?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No expenses recorded yet.
          </div>
        ) : (
          expenses?.map((expense, i) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between p-3 bg-card border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{expense.description}</div>
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span className="capitalize">{expense.category}</span>
                      <span>•</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="font-bold text-destructive">
                  -₹{expense.amount}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
