"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Users, BookOpen, Home, DollarSign, Calendar, BarChart3, Plus } from "lucide-react"
import { AdminStudentManagement } from "@/components/modules/admin-student-management"
import { AdminTeacherManagement } from "@/components/modules/admin-teacher-management"
import { AdminHostelManagement } from "@/components/modules/admin-hostel-management"
import { AdminFeesManagement } from "@/components/modules/admin-fees-management"
import { AdminEventsManagement } from "@/components/modules/admin-events-management"
import { AdminAnalytics } from "@/components/modules/admin-analytics"
import { AdminAddStudent } from "@/components/modules/admin-add-student"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

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
              <p className="text-xs opacity-90">Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Administrator</span>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="add-student" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Student</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Teachers</span>
            </TabsTrigger>
            <TabsTrigger value="hostel" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Hostel</span>
            </TabsTrigger>
            <TabsTrigger value="fees" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Fees</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="students">
            <AdminStudentManagement />
          </TabsContent>

          <TabsContent value="add-student">
            <AdminAddStudent />
          </TabsContent>

          <TabsContent value="teachers">
            <AdminTeacherManagement />
          </TabsContent>

          <TabsContent value="hostel">
            <AdminHostelManagement />
          </TabsContent>

          <TabsContent value="fees">
            <AdminFeesManagement />
          </TabsContent>

          <TabsContent value="events">
            <AdminEventsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
