"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SpendingChartProps {
  data: Array<{
    month: string
    spending: number
    budget: number
  }>
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending vs Budget</CardTitle>
        <CardDescription>Track your spending against planned budgets</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            spending: {
              label: "Actual Spending",
              color: "hsl(var(--chart-1))",
            },
            budget: {
              label: "Planned Budget",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [
                  `$${(value / 1000).toFixed(0)}K`,
                  name === "spending" ? "Actual Spending" : "Planned Budget",
                ]}
              />
              <Legend />
              <Bar dataKey="spending" fill="var(--color-spending)" name="Actual Spending" />
              <Bar dataKey="budget" fill="var(--color-budget)" name="Planned Budget" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
