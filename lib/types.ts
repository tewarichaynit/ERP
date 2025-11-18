// Complete ERP Data Types and Schemas

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  gender: "M" | "F" | "Other"
  address: string
  city: string
  state: string
  pincode: string
  enrollmentDate: string
  currentSemester: number
  cgpa: number
  department: string
  batch: number
  profileImage?: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  department: string
  specialization: string
  qualification: string
  experience: number
  officeHours: string
}

export interface Subject {
  id: string
  code: string
  name: string
  credits: number
  semester: number
  department: string
  teacherId: string
  maxMarks: number
}

export interface SemesterDetail {
  id: string
  studentId: string
  semester: number
  startDate: string
  endDate: string
  subjects: string[] // Subject IDs
  status: "ongoing" | "completed" | "upcoming"
  gpa: number
}

export interface Result {
  id: string
  studentId: string
  subjectId: string
  semester: number
  internalMarks: number
  externalMarks: number
  totalMarks: number
  grade: string
  gradePoint: number
  date: string
}

export interface HostelRoom {
  id: string
  roomNumber: string
  capacity: number
  occupancy: number
  floor: number
  block: string
  amenities: string[]
  rentPerMonth: number
}

export interface HostelDetail {
  id: string
  studentId: string
  roomId: string
  checkInDate: string
  checkOutDate?: string
  status: "active" | "inactive"
  block: string
  floor: number
  roomNumber: string
}

export interface HostelChangeHistory {
  id: string
  studentId: string
  fromRoomId: string
  toRoomId: string
  changeDate: string
  reason: string
  approvedBy: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: "academic" | "cultural" | "sports" | "placement" | "other"
  organizer: string
  capacity?: number
  registeredCount?: number
}

export interface FeeStructure {
  id: string
  studentId: string
  semester: number
  collegeFee: number
  hostelFee: number
  busFee: number
  backFee: number
  totalFee: number
  paidAmount: number
  dueAmount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paymentHistory: PaymentRecord[]
}

export interface PaymentRecord {
  id: string
  date: string
  amount: number
  method: string
  transactionId: string
  status: "success" | "failed"
}

export interface YearSubjectDetail {
  id: string
  studentId: string
  year: number
  subjects: {
    subjectId: string
    subjectName: string
    credits: number
    semester: number
  }[]
  totalCredits: number
}

export interface User {
  id: string
  role: "student" | "admin" | "teacher"
  password: string
  lastLogin?: string
}

export interface AuthSession {
  userId: string
  role: "student" | "admin" | "teacher"
  loginTime: string
  isActive: boolean
}
