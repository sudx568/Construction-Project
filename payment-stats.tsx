"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Clock, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface PaymentStatsProps {
  stats: {
    totalPaid: number
    totalPending: number
    totalFailed: number
    completedTransactions: number
    pendingTransactions: number
    totalTransactions: number
  }
}

export function PaymentStats({ stats }: PaymentStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const cards = [
    {
      title: "Total Paid",
      value: formatCurrency(stats.totalPaid),
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Payments",
      value: formatCurrency(stats.totalPending),
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Failed Payments",
      value: formatCurrency(stats.totalFailed),
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Success Rate",
      value: `${Math.round((stats.completedTransactions / stats.totalTransactions) * 100)}%`,
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: stats.completedTransactions,
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Processing",
      value: stats.pendingTransactions,
      icon: DollarSign,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
