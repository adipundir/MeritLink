// Mock Users
export const mockUsers = [
  {
    id: "1",
    name: "John Student",
    email: "student@example.com",
    role: "student",
    department: "Computer Science",
    year: 3,
    section: "A",
    mentorId: "2",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Mentor",
    email: "mentor@example.com",
    role: "mentor",
    department: "Computer Science",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert HOD",
    email: "hod@example.com",
    role: "hod",
    department: "Computer Science",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    department: "Administration",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Sarah Student",
    email: "sarah@example.com",
    role: "student",
    department: "Electronics",
    year: 2,
    section: "B",
    mentorId: "6",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Michael Mentor",
    email: "michael@example.com",
    role: "mentor",
    department: "Electronics",
    image: "/placeholder.svg?height=40&width=40",
  },
] as const

export type Achievement = {
  id: string
  title: string
  description: string
  category: string
  date: string
  status: "approved" | "pending" | "flagged" | "rejected"
  student: {
    name: string
    email: string
    department: string
    year: number
    section: string
  }
}

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Place in Coding Competition",
    description: "Won first place in the annual coding competition",
    category: "Academic",
    date: new Date().toISOString(),
    status: "approved",
    student: {
      name: "John Doe",
      email: "john@example.com",
      department: "Computer Science",
      year: 3,
      section: "A"
    }
  },
  {
    id: "2",
    title: "Research Paper Publication",
    description: "Published a research paper in IEEE conference",
    category: "Research",
    date: new Date().toISOString(),
    status: "pending",
    student: {
      name: "Jane Smith",
      email: "jane@example.com",
      department: "Computer Science",
      year: 4,
      section: "B"
    }
  }
]

// Achievement categories
export const achievementCategories = [
  { value: "hackathon", label: "Hackathon" },
  { value: "internship", label: "Internship" },
  { value: "placement", label: "Placement" },
  { value: "competition", label: "Competition" },
  { value: "certification", label: "Certification" },
  { value: "publication", label: "Publication" },
  { value: "other", label: "Other" },
]

// Helper function to get status text
export function getStatusText(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return "Approved"
    case "rejected":
      return "Rejected"
    case "pending":
      return "Pending"
    case "flagged":
      return "Needs Review"
    default:
      return "Unknown"
  }
}

// Helper function to get status color
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "flagged":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to get category color
export function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case "academic":
      return "bg-blue-100 text-blue-800"
    case "research":
      return "bg-purple-100 text-purple-800"
    case "sports":
      return "bg-green-100 text-green-800"
    case "cultural":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

