"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Plus, User, GraduationCap, UserCircle } from "lucide-react"
import { useAchievements } from "@/hooks/use-achievements"
import AchievementList from "@/components/achievement/achievement-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { achievementCategories } from "@/lib/mock-data"
import { toast } from "sonner"
import type { Student, Mentor, Achievement } from "@/types"

export default function StudentDashboard({ userId }: { userId: string }) {
  const { getStudentAchievements, getDepartmentMentors, students, mentors, addAchievement } = useAchievements()
  const achievements = getStudentAchievements(userId)
  const student = students.find((s: Student) => s.id === userId)
  const mentor = mentors.find((m: Mentor) => m.id === student?.mentorId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [prize, setPrize] = useState("")

  const pendingCount = achievements.filter((a: Achievement) => a.status === "pending_mentor" || a.status === "pending_hod").length
  const approvedCount = achievements.filter((a: Achievement) => a.status === "approved").length
  const flaggedCount = achievements.filter((a: Achievement) => a.status === "flagged").length

  const pendingAchievements = achievements.filter((a: Achievement) => a.status === "pending_mentor" || a.status === "pending_hod")
  const approvedAchievements = achievements.filter((a: Achievement) => a.status === "approved")
  const flaggedAchievements = achievements.filter((a: Achievement) => a.status === "flagged")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !category || !student) {
      toast.error("Please fill in all required fields")
      return
    }

    const newAchievement: Achievement = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      category,
      prize,
      studentName: student.name,
      department: student.department,
      status: "pending_mentor",
      studentImage: "/avatars/placeholder.png",
      feedback: [],
      date: new Date().toISOString(),
      studentId: student.id,
      documents: []
    }

    addAchievement(newAchievement)
    toast.success("Achievement submitted for review")
    setIsDialogOpen(false)
    setTitle("")
    setDescription("")
    setCategory("")
    setPrize("")
  }

  if (!student || !mentor) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Student Not Found</h2>
          <p className="text-sm text-muted-foreground">Please check if you're logged in with the correct account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Submit Achievement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Achievement</DialogTitle>
              <DialogDescription>
                Submit your achievement for review. Your mentor will be notified.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title of your achievement"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your achievement in detail"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {achievementCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prize">Prize/Recognition</Label>
                  <Input
                    id="prize"
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                    placeholder="e.g. First Prize, Gold Medal"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit for Review</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Details</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm font-medium">{student.name}</p>
              <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
              <p className="text-xs text-muted-foreground">Year {student.year} Section {student.section}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentor</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm font-medium">{mentor.name}</p>
              <p className="text-xs text-muted-foreground">{mentor.specialization}</p>
              <p className="text-xs text-muted-foreground">{mentor.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">
              {approvedCount} Approved • {pendingCount} Pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm font-medium">{student.department}</p>
              <p className="text-xs text-muted-foreground">Computer Science & Engineering</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({flaggedCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AchievementList achievements={achievements} showFeedback />
        </TabsContent>
        <TabsContent value="pending">
          <AchievementList achievements={pendingAchievements} showFeedback />
        </TabsContent>
        <TabsContent value="approved">
          <AchievementList achievements={approvedAchievements} showFeedback />
        </TabsContent>
        <TabsContent value="flagged">
          <AchievementList achievements={flaggedAchievements} showFeedback />
        </TabsContent>
      </Tabs>
    </div>
  )
}

