export interface PricePoint {
  date: string
  price: number
  confidence?: number
}

export interface PricePrediction {
  productId: string
  productName: string
  category: string
  currentPrice: number
  historicalData: PricePoint[]
  predictions: PricePoint[]
  trend: "up" | "down" | "stable"
  confidence: number
  factors: string[]
  recommendation: string
}

// Generate realistic price history
export function generatePriceHistory(basePrice: number, days = 90): PricePoint[] {
  const history: PricePoint[] = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate realistic price fluctuations
    const seasonalFactor = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 0.05
    const randomFactor = (Math.random() - 0.5) * 0.1
    const trendFactor = (days - i) * 0.0005 // Slight upward trend over time

    const price = basePrice * (1 + seasonalFactor + randomFactor + trendFactor)

    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100,
      confidence: 0.95 - Math.random() * 0.1, // 85-95% confidence for historical data
    })
  }

  return history
}

// Generate future price predictions
export function generatePricePredictions(currentPrice: number, days = 30): PricePoint[] {
  const predictions: PricePoint[] = []
  const now = new Date()

  for (let i = 1; i <= days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)

    // Simulate AI prediction with decreasing confidence over time
    const trendFactor = i * 0.001 // Gradual price increase
    const volatility = (Math.random() - 0.5) * 0.08 * (i / days) // Increasing uncertainty
    const seasonalFactor = Math.sin(((date.getMonth() + i / 30) / 12) * 2 * Math.PI) * 0.03

    const price = currentPrice * (1 + trendFactor + volatility + seasonalFactor)
    const confidence = Math.max(0.5, 0.9 - (i / days) * 0.4) // Decreasing confidence

    predictions.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
    })
  }

  return predictions
}

// Determine price trend
export function analyzeTrend(predictions: PricePoint[]): "up" | "down" | "stable" {
  if (predictions.length < 2) return "stable"

  const firstPrice = predictions[0].price
  const lastPrice = predictions[predictions.length - 1].price
  const change = (lastPrice - firstPrice) / firstPrice

  if (change > 0.05) return "up"
  if (change < -0.05) return "down"
  return "stable"
}

// Generate market factors affecting prices
export function generateMarketFactors(category: string): string[] {
  const commonFactors = [
    "Supply chain disruptions",
    "Seasonal demand variations",
    "Transportation costs",
    "Raw material availability",
  ]

  const categoryFactors: Record<string, string[]> = {
    cement: ["Limestone prices", "Energy costs", "Environmental regulations"],
    steel: ["Iron ore prices", "Coal prices", "Global steel demand"],
    wood: ["Lumber tariffs", "Forest regulations", "Housing market trends"],
    bricks: ["Clay availability", "Kiln energy costs", "Construction permits"],
  }

  return [...commonFactors, ...(categoryFactors[category] || [])]
}

// Generate AI recommendation
export function generateRecommendation(trend: "up" | "down" | "stable", confidence: number): string {
  if (trend === "up" && confidence > 0.7) {
    return "Consider purchasing soon as prices are expected to rise. Stock up on essential materials."
  } else if (trend === "down" && confidence > 0.7) {
    return "Prices may decrease in the coming weeks. Consider delaying non-urgent purchases."
  } else if (trend === "stable") {
    return "Prices are expected to remain stable. Good time for regular procurement planning."
  } else {
    return "Price predictions show uncertainty. Monitor market conditions closely before making large purchases."
  }
}

// Mock AI predictions for demo products
export const mockPredictions: PricePrediction[] = [
  {
    productId: "1",
    productName: "Portland Cement Type I",
    category: "cement",
    currentPrice: 12.5,
    historicalData: generatePriceHistory(12.5),
    predictions: generatePricePredictions(12.5),
    trend: "up",
    confidence: 0.82,
    factors: generateMarketFactors("cement"),
    recommendation: generateRecommendation("up", 0.82),
  },
  {
    productId: "3",
    productName: "Rebar #4 (1/2 inch)",
    category: "steel",
    currentPrice: 8.25,
    historicalData: generatePriceHistory(8.25),
    predictions: generatePricePredictions(8.25),
    trend: "down",
    confidence: 0.75,
    factors: generateMarketFactors("steel"),
    recommendation: generateRecommendation("down", 0.75),
  },
  {
    productId: "5",
    productName: "2x4 Pressure Treated Lumber",
    category: "wood",
    currentPrice: 6.5,
    historicalData: generatePriceHistory(6.5),
    predictions: generatePricePredictions(6.5),
    trend: "stable",
    confidence: 0.68,
    factors: generateMarketFactors("wood"),
    recommendation: generateRecommendation("stable", 0.68),
  },
  {
    productId: "7",
    productName: "Red Clay Bricks",
    category: "bricks",
    currentPrice: 0.65,
    historicalData: generatePriceHistory(0.65),
    predictions: generatePricePredictions(0.65),
    trend: "up",
    confidence: 0.79,
    factors: generateMarketFactors("bricks"),
    recommendation: generateRecommendation("up", 0.79),
  },
]
