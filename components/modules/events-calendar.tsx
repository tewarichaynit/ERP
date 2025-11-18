"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

export function EventsCalendar() {
  const events = useMemo(() => {
    return SQLDatabase.getAllEvents().map((event: any) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.category,
      attendees: 0,
    }))
  }, [])

  const getEventColor = (type: string) => {
    switch (type) {
      case "Academic":
        return "bg-destructive/20 text-destructive"
      case "Cultural":
        return "bg-secondary/20 text-secondary-foreground"
      case "Sports":
        return "bg-blue-500/20 text-blue-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Important dates and events for the semester</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-lg">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getEventColor(event.type)}>{event.type}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendees} registered
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No upcoming events</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
