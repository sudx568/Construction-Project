"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Cart, PaymentMethod } from "@/lib/payment-data"
import { mockPaymentMethods } from "@/lib/payment-data"

const CreditCardIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface CheckoutFormProps {
  cart: Cart
  onPaymentComplete: (paymentMethodId: string) => void
}

export function CheckoutForm({ cart, onPaymentComplete }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    mockPaymentMethods.find((pm) => pm.isDefault)?.id || "",
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [billingAddress, setBillingAddress] = useState({
    company: "Smith Construction",
    address: "123 Construction Ave",
    city: "Builder City",
    state: "BC",
    zip: "12345",
  })

  const selectedMethod = mockPaymentMethods.find((pm) => pm.id === selectedPaymentMethod)

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    onPaymentComplete(selectedPaymentMethod)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount * 83) // Convert USD to INR
  }

  const getPaymentMethodIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "credit_card":
        return <CreditCardIcon />
      case "bank_transfer":
        return <BuildingIcon />
      case "net_terms":
        return <CalendarIcon />
      default:
        return <CreditCardIcon />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your items before payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.items.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{item.productName}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {formatCurrency(item.unitPrice)}
                </p>
                <p className="text-xs text-muted-foreground">from {item.supplierName}</p>
              </div>
              <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>{formatCurrency(cart.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(cart.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Choose your payment method and complete the order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            {mockPaymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getPaymentMethodIcon(method.type)}
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{method.details}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedPaymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <Label>Billing Address</Label>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={billingAddress.company}
                  onChange={(e) => setBillingAddress({ ...billingAddress, company: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={billingAddress.address}
                  onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP</Label>
                  <Input
                    id="zip"
                    value={billingAddress.zip}
                    onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <ShieldIcon />
            <span className="text-sm text-green-700">Your payment information is secure and encrypted</span>
          </div>

          {/* Payment Button */}
          <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CheckCircleIcon />
                <span>Complete Payment - {formatCurrency(cart.total)}</span>
              </div>
            )}
          </Button>

          {selectedMethod?.type === "net_terms" && (
            <p className="text-sm text-muted-foreground text-center">
              Payment will be due within 30 days of invoice date
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
