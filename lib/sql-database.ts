interface Student {
  id: string
  name: string
  email: string
  phone?: string
  dob?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  enrollmentDate?: string
  currentSemester: number
  cgpa: number
  department: string
  batch: string
}

interface Teacher {
  id: string
  name: string
  email: string
  phone?: string
  specialization: string
  experience: number
  department: string
}

interface Subject {
  id: string
  name: string
  code: string
  credits: number
  semester: number
  instructorId: string
}

interface Result {
  id: string
  studentId: string
  subjectId: string
  semester: number
  marks: number
  grade: string
}

interface Fee {
  id: string
  studentId: string
  collegeFee: number
  hostelFee: number
  busFee: number
  backFee: number
  totalFee: number
  paidAmount: number
  status: string
  dueDate: string
}

interface Hostel {
  id: string
  studentId: string
  block: string
  roomNumber: string
  floor: number
  capacity: number
  occupancy: number
  rent: number
  checkInDate: string
  amenities: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  organizer: string
}

interface SemesterDetail {
  id: string
  studentId: string
  semester: number
  subjects: string
  totalCredits: number
  startDate: string
  endDate: string
}

interface DatabaseSchema {
  students: Student[]
  teachers: Teacher[]
  subjects: Subject[]
  results: Result[]
  fees: Fee[]
  hostels: Hostel[]
  events: Event[]
  semester_details: SemesterDetail[]
}

const STORAGE_KEY = "gehu_erp_database"

export class SQLDatabase {
  private static db: DatabaseSchema | null = null

  static async initialize() {
    if (this.db) return this.db

    // Try to load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        this.db = JSON.parse(stored)
        return this.db
      } catch (error) {
        console.error("Error loading database from localStorage:", error)
      }
    }

    // Initialize with default data
    this.db = {
      students: [],
      teachers: [],
      subjects: [],
      results: [],
      fees: [],
      hostels: [],
      events: [],
      semester_details: [],
    }

    this.seedData()
    this.save()

    return this.db
  }

  private static seedData() {
    if (!this.db) return

    // Seed students
    this.db.students = [
      {
        id: "STU001",
        name: "Rajesh Kumar",
        email: "rajesh@gehu.ac.in",
        phone: "9876543210",
        dob: "2000-05-15",
        gender: "M",
        address: "123 Main St",
        city: "Bhimtal",
        state: "Uttarakhand",
        pincode: "263001",
        enrollmentDate: "2022-08-01",
        currentSemester: 4,
        cgpa: 8.5,
        department: "CSE",
        batch: "2022",
      },
      {
        id: "STU002",
        name: "Priya Singh",
        email: "priya@gehu.ac.in",
        phone: "9876543211",
        dob: "2001-03-20",
        gender: "F",
        address: "456 Oak Ave",
        city: "Nainital",
        state: "Uttarakhand",
        pincode: "263002",
        enrollmentDate: "2022-08-01",
        currentSemester: 4,
        cgpa: 8.2,
        department: "CSE",
        batch: "2022",
      },
      {
        id: "STU003",
        name: "Amit Patel",
        email: "amit@gehu.ac.in",
        phone: "9876543212",
        dob: "2000-11-10",
        gender: "M",
        address: "789 Pine Rd",
        city: "Almora",
        state: "Uttarakhand",
        pincode: "263601",
        enrollmentDate: "2022-08-01",
        currentSemester: 3,
        cgpa: 7.8,
        department: "ECE",
        batch: "2022",
      },
    ]

    // Seed teachers
    this.db.teachers = [
      {
        id: "TECH001",
        name: "Dr. Sharma",
        email: "sharma@gehu.ac.in",
        phone: "9876543220",
        specialization: "Data Structures",
        experience: 15,
        department: "CSE",
      },
      {
        id: "TECH002",
        name: "Prof. Verma",
        email: "verma@gehu.ac.in",
        phone: "9876543221",
        specialization: "Web Development",
        experience: 10,
        department: "CSE",
      },
      {
        id: "TECH003",
        name: "Dr. Gupta",
        email: "gupta@gehu.ac.in",
        phone: "9876543222",
        specialization: "Digital Electronics",
        experience: 12,
        department: "ECE",
      },
    ]

    // Seed subjects
    this.db.subjects = [
      {
        id: "SUB001",
        name: "Data Structures",
        code: "CS201",
        credits: 4,
        semester: 4,
        instructorId: "TECH001",
      },
      {
        id: "SUB002",
        name: "Web Development",
        code: "CS202",
        credits: 3,
        semester: 4,
        instructorId: "TECH002",
      },
      {
        id: "SUB003",
        name: "Database Management",
        code: "CS203",
        credits: 4,
        semester: 4,
        instructorId: "TECH001",
      },
      {
        id: "SUB004",
        name: "Digital Electronics",
        code: "EC201",
        credits: 4,
        semester: 4,
        instructorId: "TECH003",
      },
    ]

    // Seed results
    this.db.results = [
      { id: "RES001", studentId: "STU001", subjectId: "SUB001", semester: 4, marks: 85, grade: "A" },
      { id: "RES002", studentId: "STU001", subjectId: "SUB002", semester: 4, marks: 78, grade: "B+" },
      { id: "RES003", studentId: "STU001", subjectId: "SUB003", semester: 4, marks: 88, grade: "A" },
      { id: "RES004", studentId: "STU002", subjectId: "SUB001", semester: 4, marks: 82, grade: "A" },
      { id: "RES005", studentId: "STU002", subjectId: "SUB002", semester: 4, marks: 75, grade: "B" },
      { id: "RES006", studentId: "STU003", subjectId: "SUB004", semester: 3, marks: 80, grade: "A" },
    ]

    // Seed fees
    this.db.fees = [
      {
        id: "FEE001",
        studentId: "STU001",
        collegeFee: 100000,
        hostelFee: 50000,
        busFee: 5000,
        backFee: 0,
        totalFee: 155000,
        paidAmount: 155000,
        status: "paid",
        dueDate: "2024-12-31",
      },
      {
        id: "FEE002",
        studentId: "STU002",
        collegeFee: 100000,
        hostelFee: 50000,
        busFee: 0,
        backFee: 0,
        totalFee: 150000,
        paidAmount: 100000,
        status: "pending",
        dueDate: "2025-01-31",
      },
      {
        id: "FEE003",
        studentId: "STU003",
        collegeFee: 100000,
        hostelFee: 0,
        busFee: 0,
        backFee: 10000,
        totalFee: 110000,
        paidAmount: 50000,
        status: "pending",
        dueDate: "2025-02-28",
      },
    ]

    // Seed hostels
    this.db.hostels = [
      {
        id: "HOST001",
        studentId: "STU001",
        block: "Block A",
        roomNumber: "A-201",
        floor: 2,
        capacity: 2,
        occupancy: 2,
        rent: 5000,
        checkInDate: "2022-08-01",
        amenities: "WiFi,AC,Attached Bathroom",
      },
      {
        id: "HOST002",
        studentId: "STU002",
        block: "Block B",
        roomNumber: "B-105",
        floor: 1,
        capacity: 2,
        occupancy: 2,
        rent: 5000,
        checkInDate: "2022-08-01",
        amenities: "WiFi,AC,Common Bathroom",
      },
      {
        id: "HOST003",
        studentId: "STU003",
        block: "Block C",
        roomNumber: "C-301",
        floor: 3,
        capacity: 2,
        occupancy: 1,
        rent: 5000,
        checkInDate: "2022-08-01",
        amenities: "WiFi,AC,Attached Bathroom",
      },
    ]

    // Seed events
    this.db.events = [
      {
        id: "EVT001",
        title: "Annual Fest",
        description: "University annual celebration",
        date: "2025-03-15",
        time: "10:00 AM",
        location: "Main Campus",
        category: "Cultural",
        organizer: "Student Council",
      },
      {
        id: "EVT002",
        title: "Tech Summit",
        description: "Technology conference",
        date: "2025-04-10",
        time: "09:00 AM",
        location: "Auditorium",
        category: "Academic",
        organizer: "CSE Department",
      },
      {
        id: "EVT003",
        title: "Sports Day",
        description: "Inter-college sports competition",
        date: "2025-05-20",
        time: "08:00 AM",
        location: "Sports Ground",
        category: "Sports",
        organizer: "Sports Committee",
      },
    ]
  }

  private static save() {
    if (this.db) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db))
    }
  }

  static getStudent(studentId: string) {
    if (!this.db) return null
    return this.db.students.find((s) => s.id === studentId) || null
  }

  static getAllStudents() {
    if (!this.db) return []
    return this.db.students
  }

  static addStudent(student: Student) {
    if (!this.db) return false
    try {
      // Check if student already exists
      if (this.db.students.find((s) => s.id === student.id)) {
        return false
      }
      this.db.students.push(student)
      this.save()
      return true
    } catch (error) {
      console.error("Error adding student:", error)
      return false
    }
  }

  static getStudentResults(studentId: string) {
    if (!this.db) return []
    return this.db.results
      .filter((r) => r.studentId === studentId)
      .map((r) => {
        const subject = this.db?.subjects.find((s) => s.id === r.subjectId)
        return {
          ...r,
          subjectName: subject?.name || "Unknown",
          code: subject?.code || "N/A",
        }
      })
  }

  static getStudentFees(studentId: string) {
    if (!this.db) return null
    return this.db.fees.find((f) => f.studentId === studentId) || null
  }

  static getStudentHostel(studentId: string) {
    if (!this.db) return null
    return this.db.hostels.find((h) => h.studentId === studentId) || null
  }

  static getStudentSemesterDetails(studentId: string) {
    if (!this.db) return null
    return this.db.semester_details.find((s) => s.studentId === studentId) || null
  }

  static getAllTeachers() {
    if (!this.db) return []
    return this.db.teachers
  }

  static getAllHostels() {
    if (!this.db) return []
    return this.db.hostels
  }

  static getAllEvents() {
    if (!this.db) return []
    return this.db.events
  }

  static getAllFees() {
    if (!this.db) return []
    return this.db.fees
  }

  static getDatabase() {
    return this.db
  }
}
