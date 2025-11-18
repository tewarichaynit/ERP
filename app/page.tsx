"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/auth/login-page"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { AuthService } from "@/lib/auth"
import { SQLDatabase } from "@/lib/sql-database"

type UserRole = "student" | "admin" | "teacher" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [studentId, setStudentId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SQLDatabase.initialize()

        const session = AuthService.getCurrentSession()
        if (session && AuthService.isAuthenticated()) {
          setUserRole(session.role)
          setStudentId(session.userId)
        }
      } catch (error) {
        console.error("Error initializing app:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  const handleLogin = (role: UserRole, id: string) => {
    setUserRole(role)
    setStudentId(id)
  }

  const handleLogout = () => {
    AuthService.logout()
    setUserRole(null)
    setStudentId("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4 animate-pulse">
            <span className="text-xl font-bold text-primary-foreground">GE</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <>
      {userRole === "student" && <StudentDashboard studentId={studentId} onLogout={handleLogout} />}
      {userRole === "admin" && <AdminDashboard onLogout={handleLogout} />}
    </>
  )
}
