"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { PricePrediction } from "@/lib/ai-predictions"

interface PriceChartProps {
  prediction: PricePrediction
}

export function PriceChart({ prediction }: PriceChartProps) {
  // Combine historical and prediction data for chart
  const chartData = [
    ...prediction.historicalData.map((point) => ({
      ...point,
      type: "historical",
    })),
    ...prediction.predictions.map((point) => ({
      ...point,
      type: "prediction",
    })),
  ]

  const today = new Date().toISOString().split("T")[0]

  const getTrendIcon = () => {
    switch (prediction.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getTrendColor = () => {
    switch (prediction.trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{prediction.productName}</CardTitle>
            <CardDescription>Price trend analysis and predictions</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <Badge variant="secondary" className={getTrendColor()}>
              {prediction.trend.toUpperCase()}
            </Badge>
            <Badge variant="outline">{Math.round(prediction.confidence * 100)}% confidence</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price ($)",
              color: "hsl(var(--chart-1))",
            },
            prediction: {
              label: "Prediction ($)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                interval="preserveStartEnd"
              />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickFormatter={(value) => `$${value.toFixed(2)}`} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string, props: any) => [
                  `$${value.toFixed(2)}`,
                  props.payload.type === "prediction" ? "Predicted Price" : "Historical Price",
                ]}
              />
              <ReferenceLine x={today} stroke="#666" strokeDasharray="2 2" />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Current Price:</span>
            <div className="font-semibold text-lg">${prediction.currentPrice}</div>
          </div>
          <div>
            <span className="text-muted-foreground">30-day Forecast:</span>
            <div className="font-semibold text-lg">
              ${prediction.predictions[prediction.predictions.length - 1]?.price.toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Price Change:</span>
            <div className={`font-semibold text-lg ${getTrendColor()}`}>
              {prediction.trend === "up" ? "+" : prediction.trend === "down" ? "-" : ""}
              {Math.abs(
                ((prediction.predictions[prediction.predictions.length - 1]?.price - prediction.currentPrice) /
                  prediction.currentPrice) *
                  100,
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
