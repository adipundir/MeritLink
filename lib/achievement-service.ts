import { useState } from "react"
import type { Achievement } from "@/types"

// Mock data for demo purposes
const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Place in National Hackathon",
    description: "Led a team of 4 to develop an AI-powered solution for healthcare management.",
    category: "Hackathon",
    studentName: "Aditya Kumar",
    department: "Computer Science",
    prize: "₹1,00,000",
    status: "pending_hod",
    studentImage: "/avatars/student1.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student1",
    documents: [],
    mentorApproval: {
      status: "approved",
      feedback: "Excellent work!",
      date: new Date().toISOString()
    }
  },
  {
    id: "2",
    title: "Research Paper Published in IEEE",
    description: "Published a research paper on ML Algorithms.",
    category: "Research",
    studentName: "Priya Sharma",
    department: "Electronics",
    prize: "Best Paper Award",
    status: "pending_hod",
    studentImage: "/avatars/student2.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student2",
    documents: [],
    mentorApproval: {
      status: "approved",
      feedback: "Great research work",
      date: new Date().toISOString()
    }
  }
]

// Mock student data
const mockStudents = [
  { id: "student1", name: "Aditya Kumar", email: "aditya@example.com", rollNumber: "CS2024001", year: 3, section: "A", mentorId: "mentor1" },
  { id: "student2", name: "Priya Sharma", email: "priya@example.com", rollNumber: "CS2024002", year: 3, section: "A", mentorId: "mentor1" },
  { id: "student3", name: "Rahul Verma", email: "rahul@example.com", rollNumber: "CS2024003", year: 3, section: "B", mentorId: "mentor2" },
  { id: "student4", name: "Sneha Patel", email: "sneha@example.com", rollNumber: "CS2024004", year: 3, section: "B", mentorId: "mentor2" },
  { id: "student5", name: "Amit Singh", email: "amit@example.com", rollNumber: "CS2024005", year: 3, section: "A", mentorId: "mentor3" }
]

// Mock mentor data with specializations
const mockMentors = [
  { 
    id: "mentor1", 
    name: "Dr. Amit Singh", 
    email: "amit@example.com", 
    specialization: "AI/ML",
    department: "Computer Science",
    maxMentees: 10
  },
  { 
    id: "mentor2", 
    name: "Dr. Neha Gupta", 
    email: "neha@example.com", 
    specialization: "VLSI",
    department: "Computer Science",
    maxMentees: 8
  },
  { 
    id: "mentor3", 
    name: "Dr. Rajesh Kumar", 
    email: "rajesh@example.com", 
    specialization: "Robotics",
    department: "Computer Science",
    maxMentees: 12
  }
]

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements)
  const [students, setStudents] = useState(mockStudents)
  const [mentors, setMentors] = useState(mockMentors)

  const getPendingHodApprovals = (department: string) => {
    return achievements.filter(
      (a) => a.department === department && 
      a.status === "pending_hod" && 
      a.mentorApproval?.status === "approved"
    )
  }

  const getDepartmentStudents = (department: string) => {
    return students.filter(student => student.rollNumber.startsWith(department.split(" ")[0]))
  }

  const getDepartmentMentors = (department: string) => {
    return mentors.filter(mentor => mentor.department === department)
  }

  const getMentorMentees = (mentorId: string) => {
    return students.filter(student => student.mentorId === mentorId)
  }

  const updateStudentMentor = (studentId: string, newMentorId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        return { ...student, mentorId: newMentorId }
      }
      return student
    }))
  }

  const getDepartmentStats = (department: string) => {
    const departmentAchievements = achievements.filter(a => a.department === department)
    const departmentStudents = getDepartmentStudents(department)
    const departmentMentors = getDepartmentMentors(department)
    
    return {
      totalAchievements: departmentAchievements.length,
      approvedAchievements: departmentAchievements.filter(a => a.status === "approved").length,
      pendingAchievements: departmentAchievements.filter(a => a.status === "pending_hod").length,
      rejectedAchievements: departmentAchievements.filter(a => a.status === "rejected").length,
      totalStudents: departmentStudents.length,
      totalMentors: departmentMentors.length
    }
  }

  const approveAchievement = (id: string, role: "mentor" | "hod", comment: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id) {
        if (role === "hod") {
          return {
            ...achievement,
            status: "approved",
            hodApproval: {
              status: "approved",
              feedback: comment,
              date: new Date().toISOString()
            }
          }
        }
      }
      return achievement
    }))
  }

  const rejectAchievement = (id: string, role: "mentor" | "hod", comment: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id) {
        if (role === "hod") {
          return {
            ...achievement,
            status: "rejected",
            hodApproval: {
              status: "rejected",
              feedback: comment,
              date: new Date().toISOString()
            }
          }
        }
      }
      return achievement
    }))
  }

  const addFeedback = (id: string, role: "mentor" | "hod", message: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id) {
        return {
          ...achievement,
          status: "flagged",
          feedback: [
            ...achievement.feedback,
            {
              id: Math.random().toString(),
              message,
              createdAt: new Date().toISOString(),
              userId: role
            }
          ]
        }
      }
      return achievement
    }))
  }

  return {
    achievements,
    getPendingHodApprovals,
    getDepartmentMentors,
    getDepartmentStats,
    approveAchievement,
    rejectAchievement,
    addFeedback,
    getDepartmentStudents,
    getMentorMentees,
    updateStudentMentor
  }
} 