"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

interface ResultDetailsProps {
  studentId: string
}

export function ResultDetails({ studentId }: ResultDetailsProps) {
  const resultData = useMemo(() => {
    const results = SQLDatabase.getStudentResults(studentId)
    const student = SQLDatabase.getStudent(studentId)

    const chartData = results.map((r: any) => ({
      name: r.code || "Subject",
      marks: r.marks || 0,
    }))

    const avgMarks =
      results.length > 0
        ? Math.round(results.reduce((sum: number, r: any) => sum + (r.marks || 0), 0) / results.length)
        : 0

    return {
      results,
      chartData,
      avgMarks,
      cgpa: student?.cgpa || 0,
      totalCredits: results.length * 4,
    }
  }, [studentId])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Average Marks</p>
            <p className="text-3xl font-bold text-primary">{resultData.avgMarks}%</p>
          </CardContent>
        </Card>
        <Card className="border-secondary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">CGPA</p>
            <p className="text-3xl font-bold text-secondary">{resultData.cgpa.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
            <p className="text-3xl font-bold text-blue-600">{resultData.totalCredits}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      {resultData.chartData.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Marks Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="marks" fill="hsl(var(--color-primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Semester Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resultData.results.length > 0 ? (
              resultData.results.map((result: any) => (
                <div key={result.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{result.subjectName ?? result.subjectId ?? result.code}</p>
                      <p className="text-sm text-muted-foreground">{result.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{result.marks}</p>
                      <Badge className="bg-secondary text-secondary-foreground">{result.grade}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      Internal: {result.internalMarks ?? "N/A"} | External: {result.externalMarks ?? "N/A"}
                    </span>
                    <span>
                      Grade Point: {(
                        typeof result.gradePoint === "number"
                          ? result.gradePoint
                          : result.marks
                          ? Math.min(10, result.marks / 10)
                          : 0
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No results available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
