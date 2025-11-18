"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildAbsoluteUrl } from "@/lib/utils"
import { SQLDatabase } from "@/lib/sql-database"
import { useMemo } from "react"

interface StudentProfileProps {
  studentId: string
}

export function StudentProfile({ studentId }: StudentProfileProps) {
  const student = useMemo(() => {
    return SQLDatabase.getStudent(studentId)
  }, [studentId])

  if (!student) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="pt-6">
          <p className="text-destructive">Student profile not found</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate initials for avatar
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{initials}</span>
              </div>
              <div>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <CardDescription className="text-base">{student.id}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className="bg-secondary text-secondary-foreground">Semester {student.currentSemester}</Badge>
                <Badge className="bg-primary/20 text-primary">Batch {student.batch}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    const url = buildAbsoluteUrl(`/students/${student.id}`)
                    try {
                      await navigator.clipboard.writeText(url)
                      // small visual feedback; replace with a toast if you have one
                      alert('Profile link copied to clipboard:\n' + url)
                    } catch (e) {
                      // fallback: open share dialog if supported
                      if ((navigator as any).share) {
                        try {
                          await (navigator as any).share({ title: student.name, url })
                        } catch (err) {
                          console.error(err)
                          alert('Unable to copy or share link')
                        }
                      } else {
                        alert('Unable to copy link. Here it is:\n' + url)
                      }
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {student.city}, {student.state}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="font-medium">{student.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">CGPA</p>
                  <p className="font-medium">{student.cgpa.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gender</span>
              <span className="font-medium">{student.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Enrollment Date</span>
              <span className="font-medium">{student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pincode</span>
              <span className="font-medium">{student.pincode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Address</span>
              <span className="font-medium text-right">{student.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Semester</span>
              <Badge className="bg-secondary text-secondary-foreground">{student.currentSemester}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium">{student.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batch Year</span>
              <span className="font-medium">{student.batch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CGPA</span>
              <Badge className="bg-green-500/20 text-green-700">{student.cgpa.toFixed(2)}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
