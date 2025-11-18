"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { Database } from "@/lib/database"

export function AdminHostelManagement() {
  const hostels = useMemo(() => {
    const db = Database.getInstance()
    const rooms = db.getAllStudents() // Placeholder - in real app would get hostel data

    // Mock hostel blocks based on rooms
    return [
      { id: "H001", name: "Boys Hostel - Block A", capacity: 100, occupied: 95, status: "Active" },
      { id: "H002", name: "Boys Hostel - Block B", capacity: 120, occupied: 110, status: "Active" },
      { id: "H003", name: "Girls Hostel - Block A", capacity: 80, occupied: 75, status: "Active" },
      { id: "H004", name: "Girls Hostel - Block B", capacity: 100, occupied: 85, status: "Active" },
    ]
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hostel Management</CardTitle>
              <CardDescription>Manage hostel allocations and room assignments</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Hostel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hostels.map((hostel) => (
              <div key={hostel.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{hostel.name}</p>
                    <p className="text-sm text-muted-foreground">{hostel.id}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-700">{hostel.status}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-medium">
                      {hostel.occupied}/{hostel.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(hostel.occupied / hostel.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
