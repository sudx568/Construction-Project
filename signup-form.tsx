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
import { UserPlus, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface SignupFormProps {
  onToggleMode: () => void
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState<"contractor" | "supplier">("contractor")
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await signup(email, password, name, role, company)

    if (success) {
      toast({
        title: "Account created",
        description: "Welcome to AI Construction ERP",
      })
      router.push("/")
    } else {
      toast({
        title: "Signup failed",
        description: "Please try again",
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
        <CardTitle className="text-2xl font-bold">Join Our Platform</CardTitle>
        <CardDescription className="text-base">Create your AI Construction ERP account</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              type="text"
              placeholder="Enter your company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
            <UserPlus className="w-4 h-4 mr-2" />
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
