"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, Award, Plus } from "lucide-react"
import AchievementList from "@/components/achievement/achievement-list"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useState } from "react"
import type { Achievement } from "@/types"

export default function AdminDashboard() {
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isMentorDialogOpen, setIsMentorDialogOpen] = useState(false)
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false)
  const [isDepartmentListOpen, setIsDepartmentListOpen] = useState(false)
  const [isStudentListOpen, setIsStudentListOpen] = useState(false)
  const [isMentorListOpen, setIsMentorListOpen] = useState(false)
  const [isAchievementListOpen, setIsAchievementListOpen] = useState(false)

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add department logic here
    setIsDepartmentDialogOpen(false)
  }

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add student logic here
    setIsStudentDialogOpen(false)
  }

  const handleAddMentor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add mentor logic here
    setIsMentorDialogOpen(false)
  }

  const handleAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add achievement logic here
    setIsAchievementDialogOpen(false)
  }

  const allAchievements: Achievement[] = [
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
        feedback: "Excellent work on implementing the AI algorithms",
        date: new Date().toISOString()
      },
      hodApproval: {
        status: "approved",
        feedback: "Outstanding achievement that brings recognition to our department",
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
      status: "pending_hod",
      studentImage: "/avatars/student2.jpg",
      feedback: [],
      date: new Date().toISOString(),
      studentId: "student2",
      documents: [],
      mentorApproval: {
        status: "approved",
        feedback: "Well-researched paper with novel contributions",
        date: new Date().toISOString()
      }
    },
    {
      id: "3",
      title: "Internship at Google",
      description: "Selected for Summer Internship Program 2024 at Google, Mountain View.",
      category: "Internship",
      studentName: "Rahul Verma",
      department: "Computer Science",
      prize: "$8000/month",
      status: "pending_mentor",
      studentImage: "/avatars/student3.jpg",
      feedback: [],
      date: new Date().toISOString(),
      studentId: "student3",
      documents: []
    },
    {
      id: "4",
      title: "Smart India Hackathon Winner",
      description: "Developed an innovative solution for digital governance, winning the gold medal at Smart India Hackathon 2024.",
      category: "Hackathon",
      studentName: "Sneha Patel",
      department: "Computer Science",
      prize: "Gold Medal",
      status: "flagged",
      studentImage: "/avatars/student4.jpg",
      feedback: [
        {
          id: "f1",
          message: "Please provide additional documentation for the project implementation",
          createdAt: new Date().toISOString(),
          userId: "mentor1"
        }
      ],
      date: new Date().toISOString(),
      studentId: "student4",
      documents: []
    }
  ]

  const pendingMentorApproval = allAchievements.filter(a => a.status === "pending_mentor")
  const pendingHodApproval = allAchievements.filter(a => a.status === "pending_hod")
  const approvedAchievements = allAchievements.filter(a => a.status === "approved")
  const flaggedAchievements = allAchievements.filter(a => a.status === "flagged")

  // Sample data for lists
  const departments = [
    { id: "1", name: "Computer Science", code: "CS", head: "Dr. Rajesh Kumar", hodEmail: "rajesh@example.com" },
    { id: "2", name: "Electronics", code: "EC", head: "Dr. Priya Sharma", hodEmail: "priya@example.com" },
    { id: "3", name: "Mechanical", code: "ME", head: "Dr. Suresh Verma", hodEmail: "suresh@example.com" },
  ]

  const students = [
    { id: "1", name: "Aditya Kumar", email: "aditya@example.com", department: "Computer Science", rollNumber: "CS2024001" },
    { id: "2", name: "Priya Sharma", email: "priya@example.com", department: "Electronics", rollNumber: "EC2024001" },
    { id: "3", name: "Rahul Verma", email: "rahul@example.com", department: "Computer Science", rollNumber: "CS2024002" },
  ]

  const mentors = [
    { id: "1", name: "Dr. Amit Singh", email: "amit@example.com", department: "Computer Science", specialization: "AI/ML" },
    { id: "2", name: "Dr. Neha Gupta", email: "neha@example.com", department: "Electronics", specialization: "VLSI" },
    { id: "3", name: "Dr. Rajesh Kumar", email: "rajesh@example.com", department: "Mechanical", specialization: "Robotics" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isDepartmentDialogOpen} onOpenChange={setIsDepartmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new department.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddDepartment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dept-name">Department Name</Label>
                      <Input id="dept-name" placeholder="e.g. Computer Science" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dept-code">Department Code</Label>
                      <Input id="dept-code" placeholder="e.g. CS" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dept-hod-email">HOD Email</Label>
                      <Input id="dept-hod-email" type="email" placeholder="hod@example.com" required />
                    </div>
                    <Button type="submit" className="w-full">Add Department</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={isDepartmentListOpen} onOpenChange={setIsDepartmentListOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[98vw] min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Departments</DialogTitle>
                    <DialogDescription>
                      List of all departments in the institution.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[30%] whitespace-nowrap">Name</TableHead>
                          <TableHead className="w-[10%] whitespace-nowrap">Code</TableHead>
                          <TableHead className="w-[60%] whitespace-nowrap">Head</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {departments.map((dept) => (
                          <TableRow key={dept.id}>
                            <TableCell className="whitespace-nowrap">{dept.name}</TableCell>
                            <TableCell className="whitespace-nowrap">{dept.code}</TableCell>
                            <TableCell className="whitespace-nowrap">{dept.head}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new student.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name</Label>
                      <Input id="student-name" placeholder="Student's full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" type="email" placeholder="student@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ec">Electronics</SelectItem>
                          <SelectItem value="me">Mechanical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-roll">Roll Number</Label>
                      <Input id="student-roll" placeholder="Roll number" required />
                    </div>
                    <Button type="submit" className="w-full">Add Student</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={isStudentListOpen} onOpenChange={setIsStudentListOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[98vw] min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Students</DialogTitle>
                    <DialogDescription>
                      List of all students in the institution.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[25%] whitespace-nowrap">Name</TableHead>
                          <TableHead className="w-[30%] whitespace-nowrap">Email</TableHead>
                          <TableHead className="w-[25%] whitespace-nowrap">Department</TableHead>
                          <TableHead className="w-[20%] whitespace-nowrap">Roll Number</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.email}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.department}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.rollNumber}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isMentorDialogOpen} onOpenChange={setIsMentorDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full min-w-fit sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Mentor</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new mentor.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMentor} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mentor-name">Full Name</Label>
                      <Input id="mentor-name" placeholder="Mentor's full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mentor-email">Email</Label>
                      <Input id="mentor-email" type="email" placeholder="mentor@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mentor-department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ec">Electronics</SelectItem>
                          <SelectItem value="me">Mechanical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mentor-specialization">Specialization</Label>
                      <Input id="mentor-specialization" placeholder="Area of expertise" required />
                    </div>
                    <Button type="submit" className="w-full">Add Mentor</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={isMentorListOpen} onOpenChange={setIsMentorListOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[98vw] min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Mentors</DialogTitle>
                    <DialogDescription>
                      List of all mentors in the institution.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[25%] whitespace-nowrap">Name</TableHead>
                          <TableHead className="w-[30%] whitespace-nowrap">Email</TableHead>
                          <TableHead className="w-[25%] whitespace-nowrap">Department</TableHead>
                          <TableHead className="w-[20%] whitespace-nowrap">Specialization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mentors.map((mentor) => (
                          <TableRow key={mentor.id}>
                            <TableCell className="whitespace-nowrap">{mentor.name}</TableCell>
                            <TableCell className="whitespace-nowrap">{mentor.email}</TableCell>
                            <TableCell className="whitespace-nowrap">{mentor.department}</TableCell>
                            <TableCell className="whitespace-nowrap">{mentor.specialization}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isAchievementDialogOpen} onOpenChange={setIsAchievementDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full min-w-fit sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Achievement</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new achievement.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddAchievement} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="achievement-title">Title</Label>
                      <Input id="achievement-title" placeholder="Achievement title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achievement-description">Description</Label>
                      <Input id="achievement-description" placeholder="Brief description" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achievement-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achievement-student">Student</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student1">Aditya Kumar</SelectItem>
                          <SelectItem value="student2">Priya Sharma</SelectItem>
                          <SelectItem value="student3">Rahul Verma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achievement-prize">Prize/Recognition</Label>
                      <Input id="achievement-prize" placeholder="e.g. First Place, Gold Medal" required />
                    </div>
                    <Button type="submit" className="w-full">Add Achievement</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={isAchievementListOpen} onOpenChange={setIsAchievementListOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[98vw] min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Achievements</DialogTitle>
                    <DialogDescription>
                      List of all achievements in the institution.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40%] whitespace-nowrap">Title</TableHead>
                          <TableHead className="w-[25%] whitespace-nowrap">Student</TableHead>
                          <TableHead className="w-[20%] whitespace-nowrap">Category</TableHead>
                          <TableHead className="w-[15%] whitespace-nowrap">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allAchievements.map((achievement) => (
                          <TableRow key={achievement.id}>
                            <TableCell className="whitespace-nowrap">{achievement.title}</TableCell>
                            <TableCell className="whitespace-nowrap">{achievement.studentName}</TableCell>
                            <TableCell className="whitespace-nowrap">{achievement.category}</TableCell>
                            <TableCell className="whitespace-nowrap capitalize">{achievement.status.replace('_', ' ')}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allAchievements.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <div className="border-b overflow-x-auto">
          <TabsList className="inline-flex min-w-full">
            <TabsTrigger value="achievements">All Achievements</TabsTrigger>
            <TabsTrigger value="pending_mentor">Pending Mentor ({pendingMentorApproval.length})</TabsTrigger>
            <TabsTrigger value="pending_hod">Pending HOD ({pendingHodApproval.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedAchievements.length})</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({flaggedAchievements.length})</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="comparison">Department Comparison</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="achievements">
          <AchievementList achievements={allAchievements} />
        </TabsContent>
        <TabsContent value="pending_mentor">
          <AchievementList achievements={pendingMentorApproval} />
        </TabsContent>
        <TabsContent value="pending_hod">
          <AchievementList achievements={pendingHodApproval} />
        </TabsContent>
        <TabsContent value="approved">
          <AchievementList achievements={approvedAchievements} />
        </TabsContent>
        <TabsContent value="flagged">
          <AchievementList achievements={flaggedAchievements} />
        </TabsContent>
        <TabsContent value="departments">
          <div className="rounded-lg border p-4 flex items-center justify-center h-64">
            <p className="text-muted-foreground">Demo data - department list would appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="comparison">
          <div className="rounded-lg border p-4 flex items-center justify-center h-64">
            <p className="text-muted-foreground">Demo data - department comparison would appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

