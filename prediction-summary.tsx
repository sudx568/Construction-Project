"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, DollarSign, Calendar, Target } from "lucide-react"
import type { PricePrediction } from "@/lib/ai-predictions"

interface PredictionSummaryProps {
  predictions: PricePrediction[]
}

export function PredictionSummary({ predictions }: PredictionSummaryProps) {
  const upTrends = predictions.filter((p) => p.trend === "up").length
  const downTrends = predictions.filter((p) => p.trend === "down").length
  const stableTrends = predictions.filter((p) => p.trend === "stable").length

  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length

  const highestIncrease = predictions
    .filter((p) => p.trend === "up")
    .sort((a, b) => {
      const aChange = (a.predictions[a.predictions.length - 1]?.price - a.currentPrice) / a.currentPrice
      const bChange = (b.predictions[b.predictions.length - 1]?.price - b.currentPrice) / b.currentPrice
      return bChange - aChange
    })[0]

  const stats = [
    {
      title: "Rising Prices",
      value: upTrends,
      icon: TrendingUp,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Falling Prices",
      value: downTrends,
      icon: TrendingDown,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Stable Prices",
      value: stableTrends,
      icon: Minus,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Avg Confidence",
      value: `${Math.round(avgConfidence * 100)}%`,
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.title} className={`p-4 rounded-lg ${stat.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {highestIncrease && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Price Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-red-800">{highestIncrease.productName}</h3>
                <p className="text-sm text-red-600">
                  Expected to increase by{" "}
                  {(
                    ((highestIncrease.predictions[highestIncrease.predictions.length - 1]?.price -
                      highestIncrease.currentPrice) /
                      highestIncrease.currentPrice) *
                    100
                  ).toFixed(1)}
                  % in the next 30 days
                </p>
              </div>
              <Badge variant="destructive">High Priority</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
