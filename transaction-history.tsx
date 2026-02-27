"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, RefreshCw } from "lucide-react"
import type { Transaction } from "@/lib/payment-data"
import { useState } from "react"

interface TransactionHistoryProps {
  transactions: Transaction[]
  onViewTransaction?: (transactionId: string) => void
}

export function TransactionHistory({ transactions, onViewTransaction }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date-desc")

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "amount-desc":
          return b.amount - a.amount
        case "amount-asc":
          return a.amount - b.amount
        default:
          return 0
      }
    })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and manage your payment transactions</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest)</SelectItem>
              <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
              <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{transaction.id}</h3>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">to {transaction.supplierName}</p>
                </div>
                <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment Method:</span>
                  <div>{transaction.paymentMethod}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Invoice:</span>
                  <div>{transaction.invoiceNumber || "N/A"}</div>
                </div>
              </div>

              {transaction.dueDate && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Due Date: </span>
                  <span className={new Date(transaction.dueDate) < new Date() ? "text-red-600" : ""}>
                    {new Date(transaction.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm" onClick={() => onViewTransaction?.(transaction.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
