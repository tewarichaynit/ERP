// Mock Database with localStorage persistence
import type {
  Student,
  Teacher,
  Subject,
  Result,
  HostelRoom,
  HostelDetail,
  HostelChangeHistory,
  Event,
  FeeStructure,
  User,
  AuthSession,
} from "./types"

const DB_KEY = "gehu_erp_database"
const SESSION_KEY = "gehu_erp_session"

// Initialize mock data
const MOCK_STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "Aarav Kumar",
    email: "aarav.kumar@gehu.ac.in",
    phone: "9876543210",
    dob: "2003-05-15",
    gender: "M",
    address: "123 Main Street",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    enrollmentDate: "2022-08-01",
    currentSemester: 5,
    cgpa: 8.5,
    department: "Computer Science",
    batch: 2022,
  },
  {
    id: "STU002",
    name: "Priya Sharma",
    email: "priya.sharma@gehu.ac.in",
    phone: "9876543211",
    dob: "2003-08-20",
    gender: "F",
    address: "456 Oak Avenue",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    enrollmentDate: "2022-08-01",
    currentSemester: 5,
    cgpa: 9.1,
    department: "Electronics",
    batch: 2022,
  },
  {
    id: "STU003",
    name: "Rajesh Patel",
    email: "rajesh.patel@gehu.ac.in",
    phone: "9876543212",
    dob: "2003-03-10",
    gender: "M",
    address: "789 Pine Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    enrollmentDate: "2022-08-01",
    currentSemester: 5,
    cgpa: 7.8,
    department: "Mechanical",
    batch: 2022,
  },
]

const MOCK_TEACHERS: Teacher[] = [
  {
    id: "TCH001",
    name: "Dr. Amit Singh",
    email: "amit.singh@gehu.ac.in",
    phone: "9876543220",
    department: "Computer Science",
    specialization: "Data Structures & Algorithms",
    qualification: "PhD",
    experience: 12,
    officeHours: "Mon-Wed 2-4 PM",
  },
  {
    id: "TCH002",
    name: "Prof. Neha Gupta",
    email: "neha.gupta@gehu.ac.in",
    phone: "9876543221",
    department: "Electronics",
    specialization: "Digital Electronics",
    qualification: "M.Tech",
    experience: 8,
    officeHours: "Tue-Thu 3-5 PM",
  },
]

const MOCK_SUBJECTS: Subject[] = [
  {
    id: "SUB001",
    code: "CS301",
    name: "Data Structures",
    credits: 4,
    semester: 5,
    department: "Computer Science",
    teacherId: "TCH001",
    maxMarks: 100,
  },
  {
    id: "SUB002",
    code: "CS302",
    name: "Database Management",
    credits: 3,
    semester: 5,
    department: "Computer Science",
    teacherId: "TCH001",
    maxMarks: 100,
  },
  {
    id: "SUB003",
    code: "EC301",
    name: "Digital Electronics",
    credits: 4,
    semester: 5,
    department: "Electronics",
    teacherId: "TCH002",
    maxMarks: 100,
  },
]

const MOCK_RESULTS: Result[] = [
  {
    id: "RES001",
    studentId: "STU001",
    subjectId: "SUB001",
    semester: 4,
    internalMarks: 18,
    externalMarks: 72,
    totalMarks: 90,
    grade: "A+",
    gradePoint: 4.0,
    date: "2024-06-15",
  },
  {
    id: "RES002",
    studentId: "STU001",
    subjectId: "SUB002",
    semester: 4,
    internalMarks: 16,
    externalMarks: 68,
    totalMarks: 84,
    grade: "A",
    gradePoint: 3.8,
    date: "2024-06-15",
  },
]

const MOCK_HOSTEL_ROOMS: HostelRoom[] = [
  {
    id: "ROOM001",
    roomNumber: "A-101",
    capacity: 2,
    occupancy: 2,
    floor: 1,
    block: "A",
    amenities: ["WiFi", "AC", "Attached Bathroom"],
    rentPerMonth: 5000,
  },
  {
    id: "ROOM002",
    roomNumber: "A-102",
    capacity: 2,
    occupancy: 1,
    floor: 1,
    block: "A",
    amenities: ["WiFi", "AC", "Attached Bathroom"],
    rentPerMonth: 5000,
  },
]

const MOCK_HOSTEL_DETAILS: HostelDetail[] = [
  {
    id: "HOST001",
    studentId: "STU001",
    roomId: "ROOM001",
    checkInDate: "2022-08-15",
    status: "active",
    block: "A",
    floor: 1,
    roomNumber: "A-101",
  },
]

const MOCK_EVENTS: Event[] = [
  {
    id: "EVT001",
    title: "Annual Tech Fest 2024",
    description: "Showcase of student projects and innovations",
    date: "2024-11-15",
    time: "09:00",
    location: "Main Auditorium",
    category: "cultural",
    organizer: "Student Council",
    capacity: 500,
    registeredCount: 350,
  },
  {
    id: "EVT002",
    title: "Campus Placement Drive",
    description: "Recruitment by top IT companies",
    date: "2024-12-01",
    time: "10:00",
    location: "Placement Cell",
    category: "placement",
    organizer: "Placement Cell",
    capacity: 200,
    registeredCount: 180,
  },
]

const MOCK_FEE_STRUCTURE: FeeStructure[] = [
  {
    id: "FEE001",
    studentId: "STU001",
    semester: 5,
    collegeFee: 50000,
    hostelFee: 30000,
    busFee: 5000,
    backFee: 0,
    totalFee: 85000,
    paidAmount: 85000,
    dueAmount: 0,
    dueDate: "2024-09-30",
    status: "paid",
    paymentHistory: [
      {
        id: "PAY001",
        date: "2024-09-15",
        amount: 85000,
        method: "Online Transfer",
        transactionId: "TXN123456",
        status: "success",
      },
    ],
  },
]

const MOCK_USERS: User[] = [
  {
    id: "STU001",
    role: "student",
    password: "student123",
  },
  {
    id: "STU002",
    role: "student",
    password: "student123",
  },
  {
    id: "STU003",
    role: "student",
    password: "student123",
  },
  {
    id: "ADMIN001",
    role: "admin",
    password: "admin123",
  },
]

export class Database {
  private static instance: Database
  private data: {
    students: Student[]
    teachers: Teacher[]
    subjects: Subject[]
    results: Result[]
    hostelRooms: HostelRoom[]
    hostelDetails: HostelDetail[]
    hostelChangeHistory: HostelChangeHistory[]
    events: Event[]
    feeStructures: FeeStructure[]
    users: User[]
  }

  private constructor() {
    this.data = this.loadFromStorage()
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  private loadFromStorage() {
    if (typeof window === "undefined") {
      return this.getDefaultData()
    }

    const stored = localStorage.getItem(DB_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return this.getDefaultData()
      }
    }
    return this.getDefaultData()
  }

  private getDefaultData() {
    return {
      students: MOCK_STUDENTS,
      teachers: MOCK_TEACHERS,
      subjects: MOCK_SUBJECTS,
      results: MOCK_RESULTS,
      hostelRooms: MOCK_HOSTEL_ROOMS,
      hostelDetails: MOCK_HOSTEL_DETAILS,
      hostelChangeHistory: [],
      events: MOCK_EVENTS,
      feeStructures: MOCK_FEE_STRUCTURE,
      users: MOCK_USERS,
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data))
    }
  }

  // Student operations
  getStudent(id: string): Student | undefined {
    return this.data.students.find((s) => s.id === id)
  }

  getAllStudents(): Student[] {
    return this.data.students
  }

  updateStudent(id: string, updates: Partial<Student>) {
    const student = this.data.students.find((s) => s.id === id)
    if (student) {
      Object.assign(student, updates)
      this.saveToStorage()
    }
  }

  // Teacher operations
  getTeacher(id: string): Teacher | undefined {
    return this.data.teachers.find((t) => t.id === id)
  }

  getAllTeachers(): Teacher[] {
    return this.data.teachers
  }

  // Subject operations
  getSubject(id: string): Subject | undefined {
    return this.data.subjects.find((s) => s.id === id)
  }

  getSubjectsBySemester(semester: number): Subject[] {
    return this.data.subjects.filter((s) => s.semester === semester)
  }

  // Result operations
  getStudentResults(studentId: string): Result[] {
    return this.data.results.filter((r) => r.studentId === studentId)
  }

  // Hostel operations
  getHostelDetail(studentId: string): HostelDetail | undefined {
    return this.data.hostelDetails.find((h) => h.studentId === studentId && h.status === "active")
  }

  getHostelRoom(roomId: string): HostelRoom | undefined {
    return this.data.hostelRooms.find((r) => r.id === roomId)
  }

  // Event operations
  getAllEvents(): Event[] {
    return this.data.events
  }

  getUpcomingEvents(): Event[] {
    const today = new Date().toISOString().split("T")[0]
    return this.data.events.filter((e) => e.date >= today)
  }

  // Fee operations
  getStudentFees(studentId: string): FeeStructure | undefined {
    return this.data.feeStructures.find((f) => f.studentId === studentId)
  }

  // User/Auth operations
  getUser(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id)
  }

  validateCredentials(id: string, password: string): boolean {
    const user = this.getUser(id)
    return user ? user.password === password : false
  }
}

// Session management
export class SessionManager {
  static createSession(userId: string, role: "student" | "admin" | "teacher"): AuthSession {
    const session: AuthSession = {
      userId,
      role,
      loginTime: new Date().toISOString(),
      isActive: true,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    }

    return session
  }

  static getSession(): AuthSession | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return null
      }
    }
    return null
  }

  static clearSession() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY)
    }
  }

  static isSessionValid(): boolean {
    const session = this.getSession()
    return session ? session.isActive : false
  }
}
