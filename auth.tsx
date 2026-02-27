"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "contractor" | "supplier"
  company?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "contractor" | "supplier") => Promise<boolean>
  signup: (
    email: string,
    password: string,
    name: string,
    role: "contractor" | "supplier",
    company?: string,
  ) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: User[] = [
  { id: "1", email: "contractor@demo.com", name: "John Smith", role: "contractor", company: "Smith Construction" },
  { id: "2", email: "supplier@demo.com", name: "Sarah Johnson", role: "supplier", company: "BuildMart Supplies" },
  { id: "3", email: "admin@demo.com", name: "Admin User", role: "contractor", company: "ERP Admin" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    try {
      const storedUser = localStorage.getItem("erp-user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        console.log("[v0] Restored user from localStorage:", parsedUser)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("[v0] Error parsing stored user:", error)
      localStorage.removeItem("erp-user")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "contractor" | "supplier"): Promise<boolean> => {
    console.log("[v0] Login attempt:", { email, role })
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)

    // For demo purposes, accept any password for demo accounts, or "demo" for any account
    const isValidPassword = password === "demo" || (foundUser && password.length > 0)

    if (foundUser && isValidPassword) {
      console.log("[v0] Login successful for user:", foundUser)
      setUser(foundUser)
      localStorage.setItem("erp-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    console.log("[v0] Login failed - user not found or invalid credentials")
    setIsLoading(false)
    return false
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: "contractor" | "supplier",
    company?: string,
  ): Promise<boolean> => {
    console.log("[v0] Signup attempt:", { email, name, role, company })
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      company,
    }

    console.log("[v0] Signup successful for user:", newUser)
    setUser(newUser)
    localStorage.setItem("erp-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    console.log("[v0] User logged out")
    setUser(null)
    localStorage.removeItem("erp-user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
