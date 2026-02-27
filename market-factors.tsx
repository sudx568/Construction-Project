"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import type { PricePrediction } from "@/lib/ai-predictions"

interface MarketFactorsProps {
  prediction: PricePrediction
}

export function MarketFactors({ prediction }: MarketFactorsProps) {
  const getAlertVariant = () => {
    switch (prediction.trend) {
      case "up":
        return "destructive"
      case "down":
        return "default"
      default:
        return "default"
    }
  }

  const getAlertIcon = () => {
    switch (prediction.trend) {
      case "up":
        return <AlertTriangle className="h-4 w-4" />
      case "down":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
        <CardDescription>Factors influencing {prediction.productName} prices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={getAlertVariant()}>
          {getAlertIcon()}
          <AlertDescription>
            <strong>AI Recommendation:</strong> {prediction.recommendation}
          </AlertDescription>
        </Alert>

        <div>
          <h4 className="font-semibold mb-3">Key Market Factors</h4>
          <div className="grid grid-cols-1 gap-2">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <span className="text-sm">{factor}</span>
                <Badge variant="outline" className="text-xs">
                  {Math.random() > 0.5 ? "High Impact" : "Medium Impact"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <span className="text-sm text-muted-foreground">Prediction Confidence</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Market Volatility</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(1 - prediction.confidence) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {prediction.confidence > 0.8 ? "Low" : prediction.confidence > 0.6 ? "Medium" : "High"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
