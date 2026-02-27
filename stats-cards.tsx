"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, DollarSign, Package, TrendingUp, Clock, CheckCircle, BarChart3, PiggyBank } from "lucide-react"
import type { DashboardStats } from "@/lib/dashboard-data"

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Total Budget",
      value: `$${(stats.totalBudget / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: `$${(stats.totalSpent / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Package,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Progress",
      value: `${Math.round(stats.avgProjectProgress)}%`,
      icon: BarChart3,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Monthly Savings",
      value: `$${(stats.monthlySavings / 1000).toFixed(0)}K`,
      icon: PiggyBank,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      badge: "AI Powered",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{card.value}</div>
                {card.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {card.badge}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
