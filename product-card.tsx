"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/data"
import Image from "next/image"

const StarIcon = () => (
  <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m0 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v9.01"
    />
  </svg>
)

const Building2Icon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onCompare?: (product: Product) => void
  isComparing?: boolean
}

export function ProductCard({ product, onAddToCart, onCompare, isComparing }: ProductCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83) // Convert USD to INR (approximate rate)
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="aspect-square relative mb-2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            {product.inStock ? (
              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>
            <span className="text-sm text-muted-foreground">{product.unit}</span>
          </div>

          <div className="flex items-center space-x-1">
            <StarIcon />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Building2Icon />
            <span>{product.supplierCompany}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="text-xs text-muted-foreground">
            Min. order: {product.minOrder} {product.unit.includes("per") ? product.unit.split("per ")[1] : "units"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 space-y-2">
        <div className="flex space-x-2 w-full">
          <Button className="flex-1" onClick={() => onAddToCart?.(product)} disabled={!product.inStock}>
            <ShoppingCartIcon />
            Add to Cart
          </Button>
          <Button variant="outline" onClick={() => onCompare?.(product)} className={isComparing ? "bg-accent" : ""}>
            Compare
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
