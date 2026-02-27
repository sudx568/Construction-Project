export interface Project {
  id: string
  name: string
  status: "planning" | "in-progress" | "completed" | "on-hold"
  startDate: string
  endDate: string
  budget: number
  spent: number
  progress: number
  location: string
  contractor: string
  description: string
}

export interface Order {
  id: string
  projectId: string
  projectName: string
  supplierId: string
  supplierName: string
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  expectedDelivery: string
  trackingNumber?: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  totalBudget: number
  totalSpent: number
  pendingOrders: number
  completedOrders: number
  avgProjectProgress: number
  monthlySavings: number
}

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    status: "in-progress",
    startDate: "2024-01-15",
    endDate: "2024-08-30",
    budget: 2500000,
    spent: 1200000,
    progress: 65,
    location: "Downtown District",
    contractor: "Smith Construction",
    description: "15-story office building with underground parking",
  },
  {
    id: "2",
    name: "Residential Housing Development",
    status: "planning",
    startDate: "2024-03-01",
    endDate: "2024-12-15",
    budget: 5000000,
    spent: 250000,
    progress: 15,
    location: "Suburban Area",
    contractor: "Smith Construction",
    description: "50-unit residential complex with amenities",
  },
  {
    id: "3",
    name: "Highway Bridge Renovation",
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2024-01-30",
    budget: 1800000,
    spent: 1750000,
    progress: 100,
    location: "Highway 101",
    contractor: "Smith Construction",
    description: "Complete renovation of 500ft highway bridge",
  },
  {
    id: "4",
    name: "Shopping Mall Expansion",
    status: "on-hold",
    startDate: "2024-02-01",
    endDate: "2024-10-30",
    budget: 3200000,
    spent: 480000,
    progress: 25,
    location: "Commercial District",
    contractor: "Smith Construction",
    description: "Adding new wing to existing shopping center",
  },
]

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    projectId: "1",
    projectName: "Downtown Office Complex",
    supplierId: "1",
    supplierName: "BuildMart Supplies",
    items: [
      {
        productId: "1",
        productName: "Portland Cement Type I",
        quantity: 200,
        unitPrice: 12.5,
        totalPrice: 2500,
      },
      {
        productId: "3",
        productName: "Rebar #4 (1/2 inch)",
        quantity: 100,
        unitPrice: 8.25,
        totalPrice: 825,
      },
    ],
    totalAmount: 3325,
    status: "delivered",
    orderDate: "2024-01-20",
    expectedDelivery: "2024-01-25",
    trackingNumber: "TRK-12345",
  },
  {
    id: "ORD-002",
    projectId: "2",
    projectName: "Residential Housing Development",
    supplierId: "3",
    supplierName: "EcoWood Solutions",
    items: [
      {
        productId: "5",
        productName: "2x4 Pressure Treated Lumber",
        quantity: 500,
        unitPrice: 6.5,
        totalPrice: 3250,
      },
    ],
    totalAmount: 3250,
    status: "shipped",
    orderDate: "2024-01-22",
    expectedDelivery: "2024-01-28",
    trackingNumber: "TRK-12346",
  },
  {
    id: "ORD-003",
    projectId: "1",
    projectName: "Downtown Office Complex",
    supplierId: "2",
    supplierName: "Premium Steel Co.",
    items: [
      {
        productId: "4",
        productName: "Steel I-Beam 8x10",
        quantity: 25,
        unitPrice: 145.0,
        totalPrice: 3625,
      },
    ],
    totalAmount: 3625,
    status: "confirmed",
    orderDate: "2024-01-24",
    expectedDelivery: "2024-02-01",
  },
  {
    id: "ORD-004",
    projectId: "4",
    projectName: "Shopping Mall Expansion",
    supplierId: "4",
    supplierName: "Quality Bricks Ltd.",
    items: [
      {
        productId: "7",
        productName: "Red Clay Bricks",
        quantity: 10000,
        unitPrice: 0.65,
        totalPrice: 6500,
      },
    ],
    totalAmount: 6500,
    status: "pending",
    orderDate: "2024-01-25",
    expectedDelivery: "2024-02-05",
  },
]

// Calculate dashboard statistics
export function calculateDashboardStats(projects: Project[], orders: Order[]): DashboardStats {
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === "in-progress").length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length
  const completedOrders = orders.filter((o) => o.status === "delivered").length
  const avgProjectProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  const monthlySavings = 45000 // Mock savings from AI predictions

  return {
    totalProjects,
    activeProjects,
    totalBudget,
    totalSpent,
    pendingOrders,
    completedOrders,
    avgProjectProgress,
    monthlySavings,
  }
}

// Generate monthly spending data for charts
export function generateMonthlySpending() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map((month, index) => ({
    month,
    spending: Math.floor(Math.random() * 500000) + 200000,
    budget: Math.floor(Math.random() * 600000) + 400000,
  }))
}

// Generate project progress data
export function generateProjectProgress() {
  return mockProjects.map((project) => ({
    name: project.name.split(" ").slice(0, 2).join(" "),
    progress: project.progress,
    budget: project.budget,
    spent: project.spent,
  }))
}
