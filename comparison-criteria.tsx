"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Settings, RotateCcw } from "lucide-react"
import type { ComparisonCriteria } from "@/lib/comparison-data"

interface ComparisonCriteriaProps {
  criteria: ComparisonCriteria
  onCriteriaChange: (criteria: ComparisonCriteria) => void
}

export function ComparisonCriteriaComponent({ criteria, onCriteriaChange }: ComparisonCriteriaProps) {
  const handleWeightChange = (key: keyof ComparisonCriteria, value: number[]) => {
    onCriteriaChange({
      ...criteria,
      [key]: value[0],
    })
  }

  const resetToDefaults = () => {
    onCriteriaChange({
      category: criteria.category,
      priceWeight: 25,
      qualityWeight: 25,
      deliveryWeight: 20,
      serviceWeight: 15,
      reliabilityWeight: 15,
    })
  }

  const totalWeight =
    criteria.priceWeight +
    criteria.qualityWeight +
    criteria.deliveryWeight +
    criteria.serviceWeight +
    criteria.reliabilityWeight

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Comparison Criteria
            </CardTitle>
            <CardDescription>Adjust the importance of each factor in supplier evaluation</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Product Category</Label>
          <Select
            value={criteria.category || "all"}
            onValueChange={(value) =>
              onCriteriaChange({
                ...criteria,
                category: value === "all" ? undefined : value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cement">Cement</SelectItem>
              <SelectItem value="steel">Steel</SelectItem>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="bricks">Bricks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weight Sliders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Evaluation Weights</h3>
            <span className="text-sm text-muted-foreground">Total: {totalWeight}%</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Price Importance</Label>
                <span className="text-sm font-medium">{criteria.priceWeight}%</span>
              </div>
              <Slider
                value={[criteria.priceWeight]}
                onValueChange={(value) => handleWeightChange("priceWeight", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Quality Importance</Label>
                <span className="text-sm font-medium">{criteria.qualityWeight}%</span>
              </div>
              <Slider
                value={[criteria.qualityWeight]}
                onValueChange={(value) => handleWeightChange("qualityWeight", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Delivery Speed Importance</Label>
                <span className="text-sm font-medium">{criteria.deliveryWeight}%</span>
              </div>
              <Slider
                value={[criteria.deliveryWeight]}
                onValueChange={(value) => handleWeightChange("deliveryWeight", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Customer Service Importance</Label>
                <span className="text-sm font-medium">{criteria.serviceWeight}%</span>
              </div>
              <Slider
                value={[criteria.serviceWeight]}
                onValueChange={(value) => handleWeightChange("serviceWeight", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Reliability Importance</Label>
                <span className="text-sm font-medium">{criteria.reliabilityWeight}%</span>
              </div>
              <Slider
                value={[criteria.reliabilityWeight]}
                onValueChange={(value) => handleWeightChange("reliabilityWeight", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {totalWeight !== 100 && (
            <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
              Note: Weights should total 100% for accurate scoring
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
