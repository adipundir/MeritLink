import { useState } from "react"
import type { Achievement, Student, Mentor } from "@/types"

// Mock student data
const mockStudents: Student[] = [
  { 
    id: "student1", 
    name: "Aditya Kumar", 
    email: "aditya@example.com", 
    rollNumber: "CS2024001", 
    year: 3, 
    section: "A", 
    mentorId: "mentor1",
    department: "Computer Science" 
  },
  { 
    id: "student2", 
    name: "Priya Sharma", 
    email: "priya@example.com", 
    rollNumber: "CS2024002", 
    year: 3, 
    section: "A", 
    mentorId: "mentor1",
    department: "Computer Science" 
  },
  { 
    id: "student3", 
    name: "Rahul Verma", 
    email: "rahul@example.com", 
    rollNumber: "CS2024003", 
    year: 3, 
    section: "B", 
    mentorId: "mentor2",
    department: "Computer Science" 
  }
]

// Mock mentor data
const mockMentors: Mentor[] = [
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
  }
]

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Place in National Hackathon",
    description: "Led a team of 4 to develop an AI-powered solution for healthcare management.",
    category: "Hackathon",
    studentName: "Aditya Kumar",
    department: "Computer Science",
    prize: "₹1,00,000",
    status: "approved",
    studentImage: "/avatars/student1.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student1",
    documents: [],
    mentorApproval: {
      status: "approved",
      feedback: "Excellent work! The solution shows great innovation.",
      date: new Date().toISOString()
    },
    hodApproval: {
      status: "approved",
      feedback: "Outstanding achievement. Keep up the good work!",
      date: new Date().toISOString()
    }
  },
  {
    id: "2",
    title: "Research Paper Published in IEEE",
    description: "Published a research paper on ML Algorithms in Healthcare.",
    category: "Research",
    studentName: "Aditya Kumar",
    department: "Computer Science",
    prize: "Best Paper Award",
    status: "pending_hod",
    studentImage: "/avatars/student1.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student1",
    documents: [],
    mentorApproval: {
      status: "approved",
      feedback: "Well-researched paper with novel contributions.",
      date: new Date().toISOString()
    }
  },
  {
    id: "3",
    title: "Smart India Hackathon Finalist",
    description: "Developed an innovative solution for digital governance.",
    category: "Hackathon",
    studentName: "Aditya Kumar",
    department: "Computer Science",
    prize: "Finalist",
    status: "flagged",
    studentImage: "/avatars/student1.jpg",
    feedback: [
      {
        id: "f1",
        message: "Please provide additional documentation about the implementation details.",
        createdAt: new Date().toISOString(),
        userId: "mentor"
      }
    ],
    date: new Date().toISOString(),
    studentId: "student1",
    documents: []
  }
]

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements)
  const [students] = useState<Student[]>(mockStudents)
  const [mentors] = useState<Mentor[]>(mockMentors)

  const getStudentAchievements = (studentId: string) => {
    return achievements.filter(a => a.studentId === studentId)
  }

  const getDepartmentMentors = (department: string) => {
    return mentors.filter(m => m.department === department)
  }

  const addAchievement = (achievement: Achievement) => {
    setAchievements(prev => [...prev, achievement])
  }

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, ...updates } : achievement
    ))
  }

  const addFeedback = (achievementId: string, feedback: Achievement['feedback'][0]) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId) {
        return {
          ...achievement,
          feedback: [...achievement.feedback, feedback]
        }
      }
      return achievement
    }))
  }

  return {
    achievements,
    students,
    mentors,
    getStudentAchievements,
    getDepartmentMentors,
    addAchievement,
    updateAchievement,
    addFeedback
  }
} 