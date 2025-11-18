"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, BookOpen, Home, DollarSign } from "lucide-react"
import { Database } from "@/lib/database"
import { useMemo } from "react"

export function AdminAnalytics() {
  const analytics = useMemo(() => {
    const db = Database.getInstance()
    const students = db.getAllStudents()
    const teachers = db.getAllTeachers()
    const hostelDetails = db.getAllStudents().length // Placeholder for hostel occupancy
    const fees = db.getAllStudents().length // Placeholder for fees

    // Group students by semester
    const semesterData = [1, 2, 3, 4, 5, 6].map((sem) => ({
      semester: `Sem ${sem}`,
      students: students.filter((s) => s.currentSemester === sem).length,
    }))

    // Group students by department
    const departments = [...new Set(students.map((s) => s.department))]
    const departmentData = departments.map((dept) => ({
      name: dept.split(" ")[0],
      value: students.filter((s) => s.department === dept).length,
    }))

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      hostelOccupancy: hostelDetails,
      semesterData,
      departmentData,
    }
  }, [])

  const COLORS = [
    "hsl(var(--color-primary))",
    "hsl(var(--color-secondary))",
    "hsl(var(--color-chart-3))",
    "hsl(var(--color-chart-4))",
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                <p className="text-3xl font-bold text-primary">{analytics.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Teachers</p>
                <p className="text-3xl font-bold text-secondary">{analytics.totalTeachers}</p>
              </div>
              <BookOpen className="w-8 h-8 text-secondary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Students</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.totalStudents}</p>
              </div>
              <Home className="w-8 h-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg CGPA</p>
                <p className="text-3xl font-bold text-green-600">8.5</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Student Distribution by Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.semesterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="hsl(var(--color-primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: { name: string; value: number }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
