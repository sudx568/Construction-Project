"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/data"
import Image from "next/image"

interface ProductComparisonProps {
  products: Product[]
  onRemoveProduct: (productId: string) => void
  onAddToCart: (product: Product) => void
  onClose: () => void
}

export function ProductComparison({ products, onRemoveProduct, onAddToCart, onClose }: ProductComparisonProps) {
  if (products.length === 0) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Product Comparison ({products.length}/3)</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => onRemoveProduct(product.id)}
              >
                <X className="h-3 w-3" />
              </Button>

              <div className="space-y-3">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {product.category}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-primary">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>{product.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supplier:</span>
                    <span className="text-xs">{product.supplierCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Order:</span>
                    <span>{product.minOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <Button size="sm" className="w-full" onClick={() => onAddToCart(product)} disabled={!product.inStock}>
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
