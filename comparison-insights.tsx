"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import type { SupplierComparison } from "@/lib/comparison-data"
import { getComparisonInsights } from "@/lib/comparison-data"

interface ComparisonInsightsProps {
  comparisons: SupplierComparison[]
}

export function ComparisonInsights({ comparisons }: ComparisonInsightsProps) {
  const insights = getComparisonInsights(comparisons)

  if (comparisons.length < 2) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add More Suppliers</h3>
          <p className="text-muted-foreground">Compare at least 2 suppliers to see insights and recommendations.</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Calculate potential savings
  const prices = comparisons.map((c) => c.priceAnalysis.averagePrice)
  const lowestPrice = Math.min(...prices)
  const highestPrice = Math.max(...prices)
  const potentialSavings = highestPrice - lowestPrice

  // Find best overall supplier (simplified)
  const bestSupplier = comparisons.reduce((best, current) => {
    const bestScore = best.supplier.rating * best.metrics.onTimeDeliveryRate
    const currentScore = current.supplier.rating * current.metrics.onTimeDeliveryRate
    return currentScore > bestScore ? current : best
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          AI Insights & Recommendations
        </CardTitle>
        <CardDescription>Smart analysis of your supplier comparison</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Insights */}
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-800">{insight}</span>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Recommendations
          </h4>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800">Best Overall Choice</h3>
              <Badge className="bg-green-100 text-green-800">Recommended</Badge>
            </div>
            <p className="text-sm text-green-700">
              <strong>{bestSupplier.supplier.company}</strong> offers the best balance of quality, reliability, and
              service with a {bestSupplier.supplier.rating}/5 rating and {bestSupplier.metrics.onTimeDeliveryRate}%
              on-time delivery.
            </p>
          </div>

          {potentialSavings > 1 && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-yellow-800">Cost Savings Opportunity</h3>
                <Badge className="bg-yellow-100 text-yellow-800">Savings</Badge>
              </div>
              <p className="text-sm text-yellow-700">
                You could save up to <strong>{formatCurrency(potentialSavings)}</strong> per unit by choosing the
                lowest-priced supplier, but consider quality and reliability trade-offs.
              </p>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-blue-800">Negotiation Tip</h3>
              <Badge className="bg-blue-100 text-blue-800">Strategy</Badge>
            </div>
            <p className="text-sm text-blue-700">
              Use the price differences in your comparison to negotiate better terms with your preferred suppliers. Show
              them competitive pricing to secure discounts.
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Risk Assessment
          </h4>

          {comparisons.map((comparison) => {
            const riskLevel =
              comparison.metrics.onTimeDeliveryRate < 90 || comparison.metrics.defectRate > 2 ? "high" : "low"
            const riskColor = riskLevel === "high" ? "text-red-600" : "text-green-600"

            return (
              <div key={comparison.supplier.id} className="flex items-center justify-between text-sm">
                <span>{comparison.supplier.company}</span>
                <Badge variant="outline" className={riskColor}>
                  {riskLevel} risk
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
