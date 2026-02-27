"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Shield,
  Bell,
  Eye,
  Lock,
  HelpCircle,
  MessageSquare,
  Settings,
  Save,
} from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Construction Ave, Builder City, BC 12345",
    company: user?.company || "",
    bio: "Experienced construction professional with 10+ years in the industry.",
    notifications: true,
    emailUpdates: true,
    darkMode: false,
  })

  const handleSave = () => {
    toast.success("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!user) return null

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto mt-2">
              <Shield className="h-3 w-3 mr-1" />
              {user.role === "contractor" ? "Contractor" : "Supplier"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{user.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{formData.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications">Push Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleInputChange("notifications", checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="emailUpdates">Email Updates</Label>
                </div>
                <Switch
                  id="emailUpdates"
                  checked={formData.emailUpdates}
                  onCheckedChange={(checked) => handleInputChange("emailUpdates", checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <Label htmlFor="darkMode">Dark Mode</Label>
                </div>
                <Switch
                  id="darkMode"
                  checked={formData.darkMode}
                  onCheckedChange={(checked) => handleInputChange("darkMode", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security & Support */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Customer Care: 1-800-ERP-HELP</p>
                  <p>Available 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          {isEditing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
