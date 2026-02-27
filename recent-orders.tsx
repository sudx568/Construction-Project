"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Package, Truck, Eye } from "lucide-react"
import type { Order } from "@/lib/dashboard-data"

interface RecentOrdersProps {
  orders: Order[]
  onViewOrder?: (orderId: string) => void
}

export function RecentOrders({ orders, onViewOrder }: RecentOrdersProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest material orders and deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.projectName}</p>
                  <p className="text-xs text-muted-foreground">from {order.supplierName}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                {order.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.productName}
                    </span>
                    <span>{formatCurrency(item.totalPrice)}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{order.items.length - 2} more items</div>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-muted-foreground">Total: </span>
                  <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">
                    Expected: {new Date(order.expectedDelivery).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => onViewOrder?.(order.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-2 text-xs text-muted-foreground">Tracking: {order.trackingNumber}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
