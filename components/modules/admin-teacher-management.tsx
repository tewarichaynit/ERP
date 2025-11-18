"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { useState, useMemo } from "react"
import { Database } from "@/lib/database"

export function AdminTeacherManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const teachers = useMemo(() => {
    const db = Database.getInstance()
    return db.getAllTeachers()
  }, [])

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Teacher Management</CardTitle>
              <CardDescription>Manage all teachers in the system</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.id} • {teacher.email}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{teacher.department}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {teacher.specialization}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-700">{teacher.experience} yrs</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No teachers found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
