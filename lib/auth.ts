import { SQLDatabase } from "./sql-database"
import { SessionManager } from "./database"

export interface LoginResult {
  success: boolean
  message: string
  userId?: string
  role?: "student" | "admin" | "teacher"
}

export class AuthService {
  static async login(userId: string, password: string): Promise<LoginResult> {
    try {
      // Initialize SQL database if not already done
      await SQLDatabase.initialize()

      // Check if user exists in SQL database
      const student = SQLDatabase.getStudent(userId)

      // Demo credentials validation
      const validCredentials = [
        { id: "STU001", password: "student123", role: "student" },
        { id: "STU002", password: "student123", role: "student" },
        { id: "STU003", password: "student123", role: "student" },
        { id: "ADMIN001", password: "admin123", role: "admin" },
      ]

      const user = validCredentials.find((u) => u.id === userId && u.password === password)

      if (!user) {
        return {
          success: false,
          message: "Invalid ID or Password",
        }
      }

      // Create session
      SessionManager.createSession(userId, user.role as "student" | "admin" | "teacher")

      return {
        success: true,
        message: "Login successful",
        userId,
        role: user.role as "student" | "admin" | "teacher",
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "An error occurred during login",
      }
    }
  }

  static logout() {
    SessionManager.clearSession()
  }

  static getCurrentSession() {
    return SessionManager.getSession()
  }

  static isAuthenticated(): boolean {
    return SessionManager.isSessionValid()
  }

  static getStudentData(studentId: string) {
    return SQLDatabase.getStudent(studentId)
  }

  static getTeacherData(teacherId: string) {
    // Teachers data from SQL database
    const teachers = SQLDatabase.getAllTeachers()
    return teachers.find((t: any) => t.id === teacherId)
  }
}
