import AchievementList from "@/components/achievement/achievement-list"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Achievement } from "@/types"

const departments = [
  "All Departments",
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical"
]

const demoAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Place in National Hackathon",
    description: "Led a team of 4 to develop an AI-powered solution for healthcare management, winning first place at the National Innovation Hackathon 2024.",
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
      date: new Date().toISOString()
    },
    hodApproval: {
      status: "approved",
      date: new Date().toISOString()
    }
  },
  {
    id: "2",
    title: "Research Paper Published in IEEE",
    description: "Published a research paper on 'Advanced Machine Learning Algorithms for Edge Computing' in the IEEE International Conference on Computing Systems.",
    category: "Research",
    studentName: "Priya Sharma",
    department: "Electronics",
    prize: "Best Paper Award",
    status: "approved",
    studentImage: "/avatars/student2.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student2",
    documents: [],
    mentorApproval: {
      status: "approved",
      date: new Date().toISOString()
    },
    hodApproval: {
      status: "approved",
      date: new Date().toISOString()
    }
  },
  {
    id: "4",
    title: "Gold Medal in Smart India Hackathon",
    description: "Developed an innovative solution for digital governance, winning the gold medal at Smart India Hackathon 2024.",
    category: "Hackathon",
    studentName: "Sneha Patel",
    department: "Computer Science",
    prize: "Gold Medal",
    status: "approved",
    studentImage: "/avatars/student4.jpg",
    feedback: [],
    date: new Date().toISOString(),
    studentId: "student4",
    documents: [],
    mentorApproval: {
      status: "approved",
      date: new Date().toISOString()
    },
    hodApproval: {
      status: "approved",
      date: new Date().toISOString()
    }
  }
]

export default function Home() {
  // Only show approved achievements on the homepage
  const approvedAchievements = demoAchievements.filter(
    (achievement) => achievement.status === "approved" && 
    achievement.mentorApproval?.status === "approved" && 
    achievement.hodApproval?.status === "approved"
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Latest Student Achievements</h1>
          <p className="text-muted-foreground">
            Celebrating the outstanding accomplishments of our talented students across various departments.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="All Departments">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">Most Recent</Button>
          <Button variant="outline">Most Popular</Button>
        </div>

        <AchievementList achievements={approvedAchievements} />
      </div>
    </div>
  )
}
