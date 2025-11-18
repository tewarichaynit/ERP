"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { AuthService } from "@/lib/auth"

interface LoginPageProps {
  // Include teacher because sessions may contain that role
  onLogin: (role: "student" | "admin" | "teacher", id: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const session = AuthService.getCurrentSession()
    if (session && AuthService.isAuthenticated()) {
      onLogin(session.role as "student" | "admin" | "teacher", session.userId)
    }
  }, [onLogin])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validate input
    if (!studentId.trim() || !password.trim()) {
      setError("Please enter both Student ID and Password")
      setIsLoading(false)
      return
    }

    const result = await AuthService.login(studentId.toUpperCase(), password)

    if (result && result.success && result.role && result.userId) {
      setSuccess("Login successful! Redirecting...")
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      onLogin(result.role, result.userId)
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* University Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <span className="text-2xl font-bold text-primary-foreground">GE</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">GEHU ERP</h1>
          <p className="text-muted-foreground">Graphic Era Hill University Bhimtal</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle className="text-2xl">Student Login</CardTitle>
            <CardDescription>Enter your credentials to access the ERP system</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{success}</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ID</label>
                <Input
                  type="text"
                  placeholder="e.g., STU001 or ADMIN001"
                  value={studentId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value.toUpperCase())}
                  className="border-primary/30 focus:border-primary"
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="border-primary/30 focus:border-primary"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium">Student:</span> STU001 / student123
                </p>
                <p>
                  <span className="font-medium">Student:</span> STU002 / student123
                </p>
                <p>
                  <span className="font-medium">Student:</span> STU003 / student123
                </p>
                <p>
                  <span className="font-medium">Admin:</span> ADMIN001 / admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2025 Graphic Era Hill University Bhimtal. All rights reserved.
        </p>
      </div>
    </div>
  )
}
