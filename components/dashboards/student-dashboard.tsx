"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut, User, BookOpen, Home, DollarSign, Calendar, FileText, Award, TrendingUp } from "lucide-react"
import { StudentProfile } from "@/components/modules/student-profile"
import { SemesterDetails } from "@/components/modules/semester-details"
import { ResultDetails } from "@/components/modules/result-details"
import { HostelDetails } from "@/components/modules/hostel-details"
import { FeesStructure } from "@/components/modules/fees-structure"
import { EventsCalendar } from "@/components/modules/events-calendar"
import { SQLDatabase } from "@/lib/sql-database"

interface StudentDashboardProps {
  studentId: string
  onLogout: () => void
}

export function StudentDashboard({ studentId, onLogout }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState("profile")

  const studentData = useMemo(() => {
    const student = SQLDatabase.getStudent(studentId)
    const results = SQLDatabase.getStudentResults(studentId)
    const fees = SQLDatabase.getStudentFees(studentId)
    return { student, results, fees }
  }, [studentId])

  const navigationCards = [
    { id: "profile", label: "Profile", icon: User, color: "from-blue-500 to-blue-600" },
    { id: "semester", label: "Semester", icon: BookOpen, color: "from-purple-500 to-purple-600" },
    { id: "results", label: "Results", icon: FileText, color: "from-green-500 to-green-600" },
    { id: "hostel", label: "Hostel", icon: Home, color: "from-orange-500 to-orange-600" },
    { id: "fees", label: "Fees", icon: DollarSign, color: "from-red-500 to-red-600" },
    { id: "events", label: "Events", icon: Calendar, color: "from-pink-500 to-pink-600" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <span className="font-bold">GE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">GEHU ERP</h1>
              <p className="text-xs opacity-90">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">ID: {studentId}</span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      {studentData.student && (
        <div className="bg-primary/5 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Current CGPA</p>
                      <p className="text-2xl font-bold text-primary">{studentData.student.cgpa?.toFixed(2) || "N/A"}</p>
                    </div>
                    <Award className="w-8 h-8 text-primary/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Semester</p>
                      <p className="text-2xl font-bold text-primary">{studentData.student.currentSemester || "N/A"}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-primary/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Results</p>
                      <p className="text-2xl font-bold text-primary">{studentData.results?.length || 0}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Fees Status</p>
                      <p className="text-2xl font-bold text-primary">
                        {studentData.fees?.status === "paid" ? "Paid" : "Pending"}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary/30" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Cards - Clickable Banners */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {navigationCards.map((card) => {
            const Icon = card.icon
            return (
              <button
                key={card.id}
                onClick={() => setActiveSection(card.id)}
                className={`p-4 rounded-lg text-white font-semibold transition-all transform hover:scale-105 cursor-pointer ${
                  activeSection === card.id ? "ring-2 ring-offset-2 ring-white" : ""
                } bg-gradient-to-br ${card.color} shadow-lg`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">{card.label}</p>
              </button>
            )
          })}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeSection === "profile" && <StudentProfile studentId={studentId} />}
          {activeSection === "semester" && <SemesterDetails studentId={studentId} />}
          {activeSection === "results" && <ResultDetails studentId={studentId} />}
          {activeSection === "hostel" && <HostelDetails studentId={studentId} />}
          {activeSection === "fees" && <FeesStructure studentId={studentId} />}
          {activeSection === "events" && <EventsCalendar />}
        </div>
      </div>
    </div>
  )
}
