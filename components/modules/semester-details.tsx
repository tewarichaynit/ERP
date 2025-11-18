"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

interface SemesterDetailsProps {
  studentId: string
}

interface Subject {
  id: string
  name: string
  code: string
  credits: number
  instructor?: string
}

export function SemesterDetails({ studentId }: SemesterDetailsProps) {
  const semesterData = useMemo<{
    semester: number
    subjects: Subject[]
    totalCredits: number
    startDate: string
    endDate: string
  }>(() => {
    const student = SQLDatabase.getStudent(studentId)
    const db = SQLDatabase.getDatabase()

    // For now, return mock semester data structure
    return {
      semester: student?.currentSemester || 1,
      subjects: [] as Subject[],
      totalCredits: 0,
      startDate: "Aug 2024",
      endDate: "Dec 2024",
    }
  }, [studentId])

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Semester {semesterData.semester} - 2024-2025</CardTitle>
              <CardDescription>Current Academic Session</CardDescription>
            </div>
            <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Total Subjects</p>
              <p className="text-2xl font-bold text-primary">{semesterData.subjects.length}</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <p className="text-xs text-muted-foreground mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-secondary">{semesterData.totalCredits}</p>
            </div>
            <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <p className="text-xs text-muted-foreground mb-1">Semester Start</p>
              <p className="text-lg font-bold text-blue-600">{semesterData.startDate}</p>
            </div>
            <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <p className="text-xs text-muted-foreground mb-1">Semester End</p>
              <p className="text-lg font-bold text-purple-600">{semesterData.endDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Enrolled Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {semesterData.subjects.length > 0 ? (
              semesterData.subjects.map((subject) => (
                <div key={subject.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                    <Badge variant="outline">{subject.credits} Credits</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Instructor: {subject.instructor}</span>
                    <Badge className="bg-green-500/20 text-green-700">Active</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No subjects enrolled</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
