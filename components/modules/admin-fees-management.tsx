"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMemo } from "react"
import { Database } from "@/lib/database"

export function AdminFeesManagement() {
  const feesData = useMemo(() => {
    const db = Database.getInstance()
    const allFees = db.getAllStudents() // Placeholder - would get actual fees data

    // Mock fees data
    return [
      { category: "College Fee", total: 500000, collected: 450000, pending: 50000 },
      { category: "Hostel Fee", total: 300000, collected: 280000, pending: 20000 },
      { category: "Bus Fee", total: 120000, collected: 100000, pending: 20000 },
      { category: "Back Fee", total: 50000, collected: 30000, pending: 20000 },
    ]
  }, [])

  const chartData = feesData.map((f) => ({
    name: f.category,
    collected: f.collected,
    pending: f.pending,
  }))

  const totalCollected = feesData.reduce((sum, f) => sum + f.collected, 0)
  const totalPending = feesData.reduce((sum, f) => sum + f.pending, 0)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-500/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
            <p className="text-3xl font-bold text-green-600">₹{(totalCollected / 100000).toFixed(1)}L</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Pending</p>
            <p className="text-3xl font-bold text-destructive">₹{(totalPending / 100000).toFixed(1)}L</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Fees Collection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="collected" fill="hsl(var(--color-primary))" />
              <Bar dataKey="pending" fill="hsl(var(--color-destructive))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fees Categories */}
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fees Categories</CardTitle>
              <CardDescription>Manage fees structure</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {feesData.map((fee) => (
              <div key={fee.category} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">{fee.category}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-medium">₹{fee.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Collected</p>
                    <p className="font-medium text-green-600">₹{fee.collected.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-medium text-destructive">₹{fee.pending.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
