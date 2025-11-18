"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Calendar, MapPin, DoorOpen } from "lucide-react"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

interface HostelDetailsProps {
  studentId: string
}

export function HostelDetails({ studentId }: HostelDetailsProps) {
  const hostelData = useMemo(() => {
    const hostel = SQLDatabase.getStudentHostel(studentId)

    return {
      hostel,
      changeHistory: [
        { year: "2022-23", room: "A-101", hostel: "Boys Hostel - Block A", status: "Completed" },
        { year: "2023-24", room: "B-103", hostel: "Boys Hostel - Block B", status: "Completed" },
        {
          year: "2024-25",
          room: hostel?.roomNumber || "B-205",
          hostel: "Boys Hostel - Block B",
          status: "Active",
        },
      ],
    }
  }, [studentId])

  if (!hostelData.hostel) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="pt-6">
          <p className="text-destructive">No hostel allocation found for this student</p>
        </CardContent>
      </Card>
    )
  }

  const hostel = hostelData.hostel

  return (
    <div className="space-y-6">
      {/* Current Room Info */}
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Hostel Block {hostel.block}</CardTitle>
                <CardDescription>Current Accommodation</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-700">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Room Number</p>
                <p className="text-lg font-semibold">{hostel.roomNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Floor</p>
                <p className="text-lg font-semibold">{hostel.floor}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Room Capacity</p>
                <p className="text-lg font-semibold">{hostel.capacity} Beds</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Check-in Date</p>
                <p className="text-lg font-semibold">{new Date(hostel.checkInDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Monthly Rent</p>
                <p className="text-lg font-semibold">₹{hostel.rent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                <p className="text-lg font-semibold">
                  {hostel.occupancy}/{hostel.capacity}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-semibold mb-3">Room Amenities</p>
            <div className="flex flex-wrap gap-2">
              {hostel.amenities?.split(",").map((amenity) => (
                <Badge key={amenity} variant="outline" className="bg-primary/5">
                  {amenity.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Details Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DoorOpen className="w-5 h-5" />
            Room Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hostel ID</span>
            <span className="font-medium">{hostel.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Block</span>
            <span className="font-medium">{hostel.block}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Floor</span>
            <span className="font-medium">{hostel.floor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Occupancy Rate</span>
            <span className="font-medium">{Math.round((hostel.occupancy / hostel.capacity) * 100)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Room History */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Room History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hostelData.changeHistory.map((history) => (
              <div key={history.year} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{history.year}</p>
                    <p className="text-sm text-muted-foreground">{history.hostel}</p>
                  </div>
                  <Badge variant={history.status === "Active" ? "default" : "outline"}>{history.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Room: {history.room}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
