export interface PaymentMethod {
  id: string
  type: "credit_card" | "bank_transfer" | "check" | "net_terms"
  name: string
  details: string
  isDefault: boolean
  lastUsed?: string
}

export interface Transaction {
  id: string
  orderId: string
  supplierId: string
  supplierName: string
  amount: number
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  paymentMethod: string
  date: string
  description: string
  invoiceNumber?: string
  dueDate?: string
}

export interface Invoice {
  id: string
  orderId: string
  supplierId: string
  supplierName: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  taxAmount: number
  totalAmount: number
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export interface CartItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  supplierId: string
  supplierName: string
}

// Mock payment methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "credit_card",
    name: "Business Credit Card",
    details: "**** **** **** 4532",
    isDefault: true,
    lastUsed: "2024-01-20",
  },
  {
    id: "2",
    type: "bank_transfer",
    name: "Business Checking",
    details: "****1234",
    isDefault: false,
    lastUsed: "2024-01-15",
  },
  {
    id: "3",
    type: "net_terms",
    name: "Net 30 Terms",
    details: "30-day payment terms",
    isDefault: false,
    lastUsed: "2024-01-10",
  },
]

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    orderId: "ORD-001",
    supplierId: "1",
    supplierName: "BuildMart Supplies",
    amount: 3325,
    status: "completed",
    paymentMethod: "Business Credit Card",
    date: "2024-01-20",
    description: "Portland Cement and Rebar purchase",
    invoiceNumber: "INV-001",
  },
  {
    id: "TXN-002",
    orderId: "ORD-002",
    supplierId: "3",
    supplierName: "EcoWood Solutions",
    amount: 3250,
    status: "processing",
    paymentMethod: "Bank Transfer",
    date: "2024-01-22",
    description: "Pressure Treated Lumber",
    invoiceNumber: "INV-002",
  },
  {
    id: "TXN-003",
    orderId: "ORD-003",
    supplierId: "2",
    supplierName: "Premium Steel Co.",
    amount: 3625,
    status: "pending",
    paymentMethod: "Net 30 Terms",
    date: "2024-01-24",
    description: "Steel I-Beam purchase",
    invoiceNumber: "INV-003",
    dueDate: "2024-02-23",
  },
  {
    id: "TXN-004",
    orderId: "ORD-004",
    supplierId: "4",
    supplierName: "Quality Bricks Ltd.",
    amount: 6500,
    status: "failed",
    paymentMethod: "Business Credit Card",
    date: "2024-01-25",
    description: "Red Clay Bricks order",
    invoiceNumber: "INV-004",
  },
]

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    orderId: "ORD-001",
    supplierId: "1",
    supplierName: "BuildMart Supplies",
    amount: 3325,
    status: "paid",
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    items: [
      {
        description: "Portland Cement Type I - 200 bags",
        quantity: 200,
        unitPrice: 12.5,
        totalPrice: 2500,
      },
      {
        description: "Rebar #4 (1/2 inch) - 100 lengths",
        quantity: 100,
        unitPrice: 8.25,
        totalPrice: 825,
      },
    ],
    taxAmount: 266,
    totalAmount: 3591,
  },
  {
    id: "INV-002",
    orderId: "ORD-002",
    supplierId: "3",
    supplierName: "EcoWood Solutions",
    amount: 3250,
    status: "sent",
    issueDate: "2024-01-22",
    dueDate: "2024-02-21",
    items: [
      {
        description: "2x4 Pressure Treated Lumber - 500 pieces",
        quantity: 500,
        unitPrice: 6.5,
        totalPrice: 3250,
      },
    ],
    taxAmount: 260,
    totalAmount: 3510,
  },
]

// Calculate cart totals
export function calculateCartTotals(items: CartItem[]): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 1000 ? 0 : 50 // Free shipping over $1000
  const total = subtotal + tax + shipping

  return {
    items,
    subtotal,
    tax,
    shipping,
    total,
  }
}

// Generate payment summary
export function generatePaymentSummary(transactions: Transaction[]) {
  const totalPaid = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const totalPending = transactions
    .filter((t) => t.status === "pending" || t.status === "processing")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalFailed = transactions.filter((t) => t.status === "failed").reduce((sum, t) => sum + t.amount, 0)

  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const pendingTransactions = transactions.filter((t) => t.status === "pending" || t.status === "processing").length

  return {
    totalPaid,
    totalPending,
    totalFailed,
    completedTransactions,
    pendingTransactions,
    totalTransactions: transactions.length,
  }
}
