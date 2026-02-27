export interface Product {
  id: string
  name: string
  category: "cement" | "steel" | "bricks" | "wood" | "tools" | "electrical" | "plumbing"
  price: number
  unit: string
  supplierId: string
  supplierName: string
  supplierCompany: string
  description: string
  inStock: boolean
  minOrder: number
  rating: number
  reviews: number
  image: string
}

export interface Supplier {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  rating: number
  totalReviews: number
  specialties: string[]
  verified: boolean
  joinedDate: string
  totalProducts: number
}

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    company: "UltraTech Cement Ltd.",
    email: "rajesh@ultratech.com",
    phone: "+91 98765 43210",
    address: "Cement House, 31 Nariman Point, Mumbai, Maharashtra 400021",
    rating: 4.8,
    totalReviews: 1256,
    specialties: ["OPC Cement", "PPC Cement", "PSC Cement"],
    verified: true,
    joinedDate: "2020-01-15",
    totalProducts: 85,
  },
  {
    id: "2",
    name: "Priya Sharma",
    company: "Tata Steel Ltd.",
    email: "priya@tatasteel.com",
    phone: "+91 98765 43211",
    address: "Bombay House, 24 Homi Mody Street, Mumbai, Maharashtra 400001",
    rating: 4.9,
    totalReviews: 2103,
    specialties: ["TMT Bars", "Structural Steel", "Steel Plates"],
    verified: true,
    joinedDate: "2019-08-20",
    totalProducts: 132,
  },
  {
    id: "3",
    name: "Amit Patel",
    company: "JSW Steel Ltd.",
    email: "amit@jswsteel.com",
    phone: "+91 98765 43212",
    address: "JSW Centre, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    rating: 4.7,
    totalReviews: 1789,
    specialties: ["TMT Bars", "Wire Rods", "Galvanized Steel"],
    verified: true,
    joinedDate: "2020-03-10",
    totalProducts: 98,
  },
  {
    id: "4",
    name: "Sunita Singh",
    company: "ACC Cement Ltd.",
    email: "sunita@acclimited.com",
    phone: "+91 98765 43213",
    address: "Cement House, 121 Maharshi Karve Road, Mumbai, Maharashtra 400020",
    rating: 4.6,
    totalReviews: 924,
    specialties: ["OPC Cement", "PPC Cement", "Ready Mix Concrete"],
    verified: true,
    joinedDate: "2020-11-05",
    totalProducts: 68,
  },
  {
    id: "5",
    name: "Vikram Gupta",
    company: "SAIL (Steel Authority of India)",
    email: "vikram@sail.co.in",
    phone: "+91 98765 43214",
    address: "Ispat Bhawan, Lodi Road, New Delhi 110003",
    rating: 4.5,
    totalReviews: 1456,
    specialties: ["TMT Bars", "Structural Steel", "Rails"],
    verified: true,
    joinedDate: "2019-05-12",
    totalProducts: 156,
  },
  {
    id: "6",
    name: "Meera Reddy",
    company: "Ambuja Cements Ltd.",
    email: "meera@ambujacement.com",
    phone: "+91 98765 43215",
    address: "Elegant Business Park, MIDC Cross Road C, Andheri East, Mumbai 400093",
    rating: 4.7,
    totalReviews: 1123,
    specialties: ["PPC Cement", "OPC Cement", "Concrete Admixtures"],
    verified: true,
    joinedDate: "2020-07-18",
    totalProducts: 74,
  },
]

export const mockProducts: Product[] = [
  // UltraTech Cement Products
  {
    id: "1",
    name: "UltraTech OPC 53 Grade Cement",
    category: "cement",
    price: 420,
    unit: "per 50kg bag",
    supplierId: "1",
    supplierName: "Rajesh Kumar",
    supplierCompany: "UltraTech Cement Ltd.",
    description: "Premium quality Ordinary Portland Cement 53 Grade for high-strength construction.",
    inStock: true,
    minOrder: 20,
    rating: 4.8,
    reviews: 245,
    image: "/ultratech-cement-bags.jpg",
  },
  {
    id: "2",
    name: "UltraTech PPC Cement",
    category: "cement",
    price: 390,
    unit: "per 50kg bag",
    supplierId: "1",
    supplierName: "Rajesh Kumar",
    supplierCompany: "UltraTech Cement Ltd.",
    description: "Portland Pozzolana Cement with enhanced durability and workability.",
    inStock: true,
    minOrder: 20,
    rating: 4.7,
    reviews: 189,
    image: "/ultratech-ppc-cement.jpg",
  },

  // ACC Cement Products
  {
    id: "3",
    name: "ACC OPC 53 Grade Cement",
    category: "cement",
    price: 315,
    unit: "per 50kg bag",
    supplierId: "4",
    supplierName: "Sunita Singh",
    supplierCompany: "ACC Cement Ltd.",
    description: "High-grade cement with superior strength and durability for construction.",
    inStock: true,
    minOrder: 25,
    rating: 4.6,
    reviews: 156,
    image: "/acc-cement-bags.jpg",
  },
  {
    id: "4",
    name: "ACC PPC Cement",
    category: "cement",
    price: 295,
    unit: "per 50kg bag",
    supplierId: "4",
    supplierName: "Sunita Singh",
    supplierCompany: "ACC Cement Ltd.",
    description: "Eco-friendly Portland Pozzolana Cement with excellent workability.",
    inStock: true,
    minOrder: 25,
    rating: 4.5,
    reviews: 134,
    image: "/acc-ppc-cement.jpg",
  },

  // Ambuja Cement Products
  {
    id: "5",
    name: "Ambuja Plus OPC 53 Cement",
    category: "cement",
    price: 315,
    unit: "per 50kg bag",
    supplierId: "6",
    supplierName: "Meera Reddy",
    supplierCompany: "Ambuja Cements Ltd.",
    description: "Premium cement with advanced technology for superior construction quality.",
    inStock: true,
    minOrder: 20,
    rating: 4.7,
    reviews: 198,
    image: "/ambuja-cement-bags.jpg",
  },

  // Tata Steel TMT Products
  {
    id: "6",
    name: "Tata Tiscon TMT 12mm",
    category: "steel",
    price: 78,
    unit: "per kg",
    supplierId: "2",
    supplierName: "Priya Sharma",
    supplierCompany: "Tata Steel Ltd.",
    description: "High-strength TMT bars with superior bendability and weldability.",
    inStock: true,
    minOrder: 100,
    rating: 4.9,
    reviews: 456,
    image: "/tata-tiscon-tmt-bars.jpg",
  },
  {
    id: "7",
    name: "Tata Tiscon TMT 16mm",
    category: "steel",
    price: 80,
    unit: "per kg",
    supplierId: "2",
    supplierName: "Priya Sharma",
    supplierCompany: "Tata Steel Ltd.",
    description: "Premium grade TMT bars for heavy construction applications.",
    inStock: true,
    minOrder: 100,
    rating: 4.8,
    reviews: 378,
    image: "/tata-tmt-16mm-bars.jpg",
  },
  {
    id: "8",
    name: "Tata Tiscon TMT 20mm",
    category: "steel",
    price: 75,
    unit: "per kg",
    supplierId: "2",
    supplierName: "Priya Sharma",
    supplierCompany: "Tata Steel Ltd.",
    description: "Heavy-duty TMT bars for structural construction projects.",
    inStock: true,
    minOrder: 50,
    rating: 4.8,
    reviews: 289,
    image: "/tata-tmt-20mm-bars.jpg",
  },

  // JSW Steel Products
  {
    id: "9",
    name: "JSW Neosteel TMT 12mm",
    category: "steel",
    price: 77,
    unit: "per kg",
    supplierId: "3",
    supplierName: "Amit Patel",
    supplierCompany: "JSW Steel Ltd.",
    description: "Advanced TMT bars with enhanced corrosion resistance.",
    inStock: true,
    minOrder: 100,
    rating: 4.7,
    reviews: 334,
    image: "/jsw-neosteel-tmt-bars.jpg",
  },
  {
    id: "10",
    name: "JSW Neosteel TMT 16mm",
    category: "steel",
    price: 79,
    unit: "per kg",
    supplierId: "3",
    supplierName: "Amit Patel",
    supplierCompany: "JSW Steel Ltd.",
    description: "High-quality TMT bars with superior strength and ductility.",
    inStock: true,
    minOrder: 100,
    rating: 4.6,
    reviews: 267,
    image: "/jsw-tmt-16mm-bars.jpg",
  },

  // SAIL Steel Products
  {
    id: "11",
    name: "SAIL TMT 12mm",
    category: "steel",
    price: 75,
    unit: "per kg",
    supplierId: "5",
    supplierName: "Vikram Gupta",
    supplierCompany: "SAIL (Steel Authority of India)",
    description: "Government quality TMT bars with consistent performance.",
    inStock: true,
    minOrder: 100,
    rating: 4.5,
    reviews: 445,
    image: "/sail-tmt-bars.jpg",
  },
  {
    id: "12",
    name: "SAIL TMT 16mm",
    category: "steel",
    price: 77,
    unit: "per kg",
    supplierId: "5",
    supplierName: "Vikram Gupta",
    supplierCompany: "SAIL (Steel Authority of India)",
    description: "Reliable TMT bars for medium to heavy construction projects.",
    inStock: true,
    minOrder: 100,
    rating: 4.4,
    reviews: 356,
    image: "/sail-tmt-16mm-bars.jpg",
  },
  {
    id: "13",
    name: "SAIL TMT 20mm",
    category: "steel",
    price: 74,
    unit: "per kg",
    supplierId: "5",
    supplierName: "Vikram Gupta",
    supplierCompany: "SAIL (Steel Authority of India)",
    description: "Heavy-duty TMT bars for large-scale construction projects.",
    inStock: true,
    minOrder: 50,
    rating: 4.5,
    reviews: 298,
    image: "/sail-tmt-20mm-bars.jpg",
  },

  // Additional Construction Materials
  {
    id: "14",
    name: "Red Clay Bricks",
    category: "bricks",
    price: 8,
    unit: "per brick",
    supplierId: "4",
    supplierName: "Sunita Singh",
    supplierCompany: "ACC Cement Ltd.",
    description: "High-quality red clay bricks for masonry construction.",
    inStock: true,
    minOrder: 1000,
    rating: 4.3,
    reviews: 189,
    image: "/red-clay-construction-bricks.jpg",
  },
  {
    id: "15",
    name: "Concrete Blocks 200x200x400mm",
    category: "bricks",
    price: 45,
    unit: "per block",
    supplierId: "1",
    supplierName: "Rajesh Kumar",
    supplierCompany: "UltraTech Cement Ltd.",
    description: "Standard concrete blocks for wall construction.",
    inStock: true,
    minOrder: 100,
    rating: 4.4,
    reviews: 167,
    image: "/concrete-construction-blocks.jpg",
  },
]

// Price history data for AI predictions
export const generatePriceHistory = (basePrice: number, productId: string) => {
  const history = []
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate realistic price fluctuations
    const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
    const seasonalFactor = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 0.1
    const trendFactor = i * 0.001 // Slight upward trend

    const price = basePrice * (1 + variation + seasonalFactor + trendFactor)

    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100,
    })
  }

  return history
}
