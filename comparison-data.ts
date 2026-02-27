import type { Supplier, Product } from "./data"
import { mockSuppliers, mockProducts } from "./data"

export interface SupplierComparison {
  supplier: Supplier
  products: Product[]
  metrics: SupplierMetrics
  priceAnalysis: PriceAnalysis
}

export interface SupplierMetrics {
  averagePrice: number
  deliveryTime: number
  qualityScore: number
  reliabilityScore: number
  customerServiceScore: number
  totalOrders: number
  onTimeDeliveryRate: number
  defectRate: number
  responseTime: number // hours
  paymentTerms: string
}

export interface PriceAnalysis {
  lowestPrice: number
  highestPrice: number
  averagePrice: number
  priceRange: number
  competitiveRating: "excellent" | "good" | "average" | "poor"
  savingsOpportunity: number
}

export interface ComparisonCriteria {
  category?: string
  priceWeight: number
  qualityWeight: number
  deliveryWeight: number
  serviceWeight: number
  reliabilityWeight: number
}

// Generate mock supplier metrics
function generateSupplierMetrics(supplierId: string): SupplierMetrics {
  const baseMetrics = {
    "1": {
      averagePrice: 12.5,
      deliveryTime: 3,
      qualityScore: 4.8,
      reliabilityScore: 4.7,
      customerServiceScore: 4.6,
      totalOrders: 156,
      onTimeDeliveryRate: 94,
      defectRate: 1.2,
      responseTime: 2,
      paymentTerms: "Net 30",
    },
    "2": {
      averagePrice: 15.2,
      deliveryTime: 2,
      qualityScore: 4.9,
      reliabilityScore: 4.8,
      customerServiceScore: 4.7,
      totalOrders: 203,
      onTimeDeliveryRate: 97,
      defectRate: 0.8,
      responseTime: 1,
      paymentTerms: "Net 15",
    },
    "3": {
      averagePrice: 11.8,
      deliveryTime: 4,
      qualityScore: 4.7,
      reliabilityScore: 4.5,
      customerServiceScore: 4.4,
      totalOrders: 89,
      onTimeDeliveryRate: 89,
      defectRate: 2.1,
      responseTime: 4,
      paymentTerms: "Net 45",
    },
    "4": {
      averagePrice: 13.1,
      deliveryTime: 3,
      qualityScore: 4.6,
      reliabilityScore: 4.6,
      customerServiceScore: 4.5,
      totalOrders: 124,
      onTimeDeliveryRate: 92,
      defectRate: 1.5,
      responseTime: 3,
      paymentTerms: "Net 30",
    },
  }

  return baseMetrics[supplierId as keyof typeof baseMetrics] || baseMetrics["1"]
}

// Generate price analysis for a supplier
function generatePriceAnalysis(supplierProducts: Product[]): PriceAnalysis {
  if (supplierProducts.length === 0) {
    return {
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
      priceRange: 0,
      competitiveRating: "average",
      savingsOpportunity: 0,
    }
  }

  const prices = supplierProducts.map((p) => p.price)
  const lowestPrice = Math.min(...prices)
  const highestPrice = Math.max(...prices)
  const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
  const priceRange = highestPrice - lowestPrice

  // Determine competitive rating based on average price vs market
  const marketAverage = 12.5 // Mock market average
  const priceRatio = averagePrice / marketAverage

  let competitiveRating: PriceAnalysis["competitiveRating"]
  if (priceRatio <= 0.9) competitiveRating = "excellent"
  else if (priceRatio <= 1.0) competitiveRating = "good"
  else if (priceRatio <= 1.1) competitiveRating = "average"
  else competitiveRating = "poor"

  const savingsOpportunity = Math.max(0, (averagePrice - marketAverage) * 100)

  return {
    lowestPrice,
    highestPrice,
    averagePrice,
    priceRange,
    competitiveRating,
    savingsOpportunity,
  }
}

// Generate supplier comparison data
export function generateSupplierComparisons(supplierIds: string[]): SupplierComparison[] {
  return supplierIds.map((supplierId) => {
    const supplier = mockSuppliers.find((s) => s.id === supplierId)
    if (!supplier) throw new Error(`Supplier ${supplierId} not found`)

    const products = mockProducts.filter((p) => p.supplierId === supplierId)
    const metrics = generateSupplierMetrics(supplierId)
    const priceAnalysis = generatePriceAnalysis(products)

    return {
      supplier,
      products,
      metrics,
      priceAnalysis,
    }
  })
}

// Calculate overall supplier score based on weighted criteria
export function calculateSupplierScore(
  comparison: SupplierComparison,
  criteria: ComparisonCriteria,
): { score: number; breakdown: Record<string, number> } {
  const { metrics } = comparison
  const { priceWeight, qualityWeight, deliveryWeight, serviceWeight, reliabilityWeight } = criteria

  // Normalize scores to 0-100 scale
  const priceScore = Math.max(0, 100 - (comparison.priceAnalysis.averagePrice / 20) * 100) // Lower price = higher score
  const qualityScore = (metrics.qualityScore / 5) * 100
  const deliveryScore = Math.max(0, 100 - (metrics.deliveryTime / 7) * 100) // Faster delivery = higher score
  const serviceScore = (metrics.customerServiceScore / 5) * 100
  const reliabilityScore = (metrics.reliabilityScore / 5) * 100

  const breakdown = {
    price: priceScore,
    quality: qualityScore,
    delivery: deliveryScore,
    service: serviceScore,
    reliability: reliabilityScore,
  }

  const totalWeight = priceWeight + qualityWeight + deliveryWeight + serviceWeight + reliabilityWeight
  const weightedScore =
    (priceScore * priceWeight +
      qualityScore * qualityWeight +
      deliveryScore * deliveryWeight +
      serviceScore * serviceWeight +
      reliabilityScore * reliabilityWeight) /
    totalWeight

  return {
    score: Math.round(weightedScore),
    breakdown,
  }
}

// Get comparison insights
export function getComparisonInsights(comparisons: SupplierComparison[]): string[] {
  const insights: string[] = []

  if (comparisons.length < 2) return insights

  // Find best in each category
  const bestPrice = comparisons.reduce((best, current) =>
    current.priceAnalysis.averagePrice < best.priceAnalysis.averagePrice ? current : best,
  )

  const bestQuality = comparisons.reduce((best, current) =>
    current.metrics.qualityScore > best.metrics.qualityScore ? current : best,
  )

  const bestDelivery = comparisons.reduce((best, current) =>
    current.metrics.deliveryTime < best.metrics.deliveryTime ? current : best,
  )

  const bestReliability = comparisons.reduce((best, current) =>
    current.metrics.onTimeDeliveryRate > best.metrics.onTimeDeliveryRate ? current : best,
  )

  insights.push(`${bestPrice.supplier.company} offers the most competitive pricing`)
  insights.push(
    `${bestQuality.supplier.company} has the highest quality rating (${bestQuality.metrics.qualityScore}/5)`,
  )
  insights.push(
    `${bestDelivery.supplier.company} provides the fastest delivery (${bestDelivery.metrics.deliveryTime} days)`,
  )
  insights.push(
    `${bestReliability.supplier.company} has the best on-time delivery rate (${bestReliability.metrics.onTimeDeliveryRate}%)`,
  )

  // Price range insight
  const prices = comparisons.map((c) => c.priceAnalysis.averagePrice)
  const priceRange = Math.max(...prices) - Math.min(...prices)
  if (priceRange > 5) {
    insights.push(`Price difference of $${priceRange.toFixed(2)} between highest and lowest suppliers`)
  }

  return insights
}
