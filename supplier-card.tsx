"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Calendar, Package, CheckCircle } from "lucide-react"
import type { Supplier } from "@/lib/data"

interface SupplierCardProps {
  supplier: Supplier
  onViewProducts?: (supplierId: string) => void
}

export function SupplierCard({ supplier, onViewProducts }: SupplierCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{supplier.company}</span>
              {supplier.verified && <CheckCircle className="h-5 w-5 text-green-500" />}
            </CardTitle>
            <p className="text-muted-foreground">{supplier.name}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{supplier.rating}</span>
            <span className="text-sm text-muted-foreground">({supplier.totalReviews})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{supplier.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{supplier.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{supplier.email}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {supplier.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {new Date(supplier.joinedDate).getFullYear()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Package className="h-4 w-4" />
            <span>{supplier.totalProducts} products</span>
          </div>
        </div>

        <Button className="w-full" onClick={() => onViewProducts?.(supplier.id)}>
          View Products
        </Button>
      </CardContent>
    </Card>
  )
}
