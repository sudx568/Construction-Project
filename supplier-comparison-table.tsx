"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Truck, Shield, Phone, Award, X } from "lucide-react"
import type { SupplierComparison, ComparisonCriteria } from "@/lib/comparison-data"
import { calculateSupplierScore } from "@/lib/comparison-data"

interface SupplierComparisonTableProps {
  comparisons: SupplierComparison[]
  criteria: ComparisonCriteria
  onRemoveSupplier: (supplierId: string) => void
  onSelectSupplier?: (supplierId: string) => void
}

export function SupplierComparisonTable({
  comparisons,
  criteria,
  onRemoveSupplier,
  onSelectSupplier,
}: SupplierComparisonTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getCompetitiveRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "average":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Comparison</CardTitle>
        <CardDescription>Compare suppliers across key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Supplier</th>
                {comparisons.map((comparison) => (
                  <th key={comparison.supplier.id} className="text-center p-4 min-w-64">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold">{comparison.supplier.company}</div>
                        <div className="text-sm text-muted-foreground">{comparison.supplier.name}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveSupplier(comparison.supplier.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Overall Score */}
              <tr className="border-b">
                <td className="p-4 font-medium">Overall Score</td>
                {comparisons.map((comparison) => {
                  const { score } = calculateSupplierScore(comparison, criteria)
                  return (
                    <td key={comparison.supplier.id} className="text-center p-4">
                      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</div>
                      <Progress value={score} className="mt-2" />
                    </td>
                  )
                })}
              </tr>

              {/* Rating */}
              <tr className="border-b">
                <td className="p-4 font-medium flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Rating
                </td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{comparison.supplier.rating}</span>
                      <span className="text-sm text-muted-foreground">({comparison.supplier.totalReviews})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Average Price */}
              <tr className="border-b">
                <td className="p-4 font-medium">Average Price</td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{formatCurrency(comparison.priceAnalysis.averagePrice)}</div>
                    <Badge className={getCompetitiveRatingColor(comparison.priceAnalysis.competitiveRating)}>
                      {comparison.priceAnalysis.competitiveRating}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Delivery Time */}
              <tr className="border-b">
                <td className="p-4 font-medium flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Delivery Time
                </td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{comparison.metrics.deliveryTime} days</div>
                    <div className="text-sm text-muted-foreground">
                      {comparison.metrics.onTimeDeliveryRate}% on-time
                    </div>
                  </td>
                ))}
              </tr>

              {/* Quality Score */}
              <tr className="border-b">
                <td className="p-4 font-medium flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Quality Score
                </td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{comparison.metrics.qualityScore}/5</div>
                    <div className="text-sm text-muted-foreground">{comparison.metrics.defectRate}% defect rate</div>
                  </td>
                ))}
              </tr>

              {/* Customer Service */}
              <tr className="border-b">
                <td className="p-4 font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Customer Service
                </td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{comparison.metrics.customerServiceScore}/5</div>
                    <div className="text-sm text-muted-foreground">{comparison.metrics.responseTime}h response</div>
                  </td>
                ))}
              </tr>

              {/* Reliability */}
              <tr className="border-b">
                <td className="p-4 font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Reliability
                </td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{comparison.metrics.reliabilityScore}/5</div>
                    <div className="text-sm text-muted-foreground">{comparison.metrics.totalOrders} orders</div>
                  </td>
                ))}
              </tr>

              {/* Payment Terms */}
              <tr className="border-b">
                <td className="p-4 font-medium">Payment Terms</td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <Badge variant="outline">{comparison.metrics.paymentTerms}</Badge>
                  </td>
                ))}
              </tr>

              {/* Total Products */}
              <tr className="border-b">
                <td className="p-4 font-medium">Products Available</td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="font-semibold">{comparison.supplier.totalProducts}</div>
                    <div className="text-sm text-muted-foreground">
                      {comparison.products.length} in selected category
                    </div>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-4 font-medium">Actions</td>
                {comparisons.map((comparison) => (
                  <td key={comparison.supplier.id} className="text-center p-4">
                    <div className="space-y-2">
                      <Button size="sm" onClick={() => onSelectSupplier?.(comparison.supplier.id)}>
                        Select Supplier
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
