"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Building2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  onToggleMode: () => void
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"contractor" | "supplier">("contractor")
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted with:", { email, role })

    const success = await login(email, password, role)

    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to AI Construction ERP",
      })
      router.push("/")
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try contractor@demo.com or supplier@demo.com with password 'demo'",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-base">Sign in to your AI Construction ERP account</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Account Type</Label>
            <Select value={role} onValueChange={(value: "contractor" | "supplier") => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
            <Shield className="w-4 h-4 mr-2" />
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-xs font-medium text-emerald-800 mb-1">Demo Accounts:</p>
            <p className="text-xs text-emerald-700">contractor@demo.com | supplier@demo.com</p>
            <p className="text-xs text-emerald-600 font-medium">Password: demo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
