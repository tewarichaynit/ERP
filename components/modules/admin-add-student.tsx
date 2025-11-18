"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { SQLDatabase } from "@/lib/sql-database"

export function AdminAddStudent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    currentSemester: "1",
    cgpa: "0",
    department: "CSE",
    batch: new Date().getFullYear().toString(),
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Use currentTarget and cast to the appropriate element so `name` is available
    const target = e.currentTarget as HTMLInputElement | HTMLSelectElement
    const { name, value } = target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validation
    if (!formData.id || !formData.name || !formData.email) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      const success = SQLDatabase.addStudent({
        ...formData,
        currentSemester: Number.parseInt(formData.currentSemester),
        cgpa: Number.parseFloat(formData.cgpa),
      })

      if (success) {
        setSuccess("Student added successfully!")
        setFormData({
          id: "",
          name: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          enrollmentDate: new Date().toISOString().split("T")[0],
          currentSemester: "1",
          cgpa: "0",
          department: "CSE",
          batch: new Date().getFullYear().toString(),
        })
      } else {
        setError("Failed to add student. Student ID may already exist.")
      }
    } catch (err) {
      setError("An error occurred while adding the student")
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Student</CardTitle>
        <CardDescription>Enter student details to add them to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Student ID *</label>
              <Input
                type="text"
                name="id"
                placeholder="e.g., STU004"
                value={formData.id}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                name="email"
                placeholder="student@gehu.ac.in"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input type="date" name="dob" value={formData.dob} onChange={handleChange} disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                type="text"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode</label>
              <Input
                type="text"
                name="pincode"
                placeholder="263001"
                value={formData.pincode}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Current Semester</label>
              <select
                name="currentSemester"
                value={formData.currentSemester}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CGPA</label>
              <Input
                type="number"
                name="cgpa"
                placeholder="0.00"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Student..." : "Add Student"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
