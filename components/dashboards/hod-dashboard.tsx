"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AchievementList from "@/components/achievement/achievement-list"
import { Users, Award, Clock, GraduationCap, UserPlus } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAchievements } from "@/lib/achievement-service"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HodDashboard({ department }: { department: string }) {
  const { 
    getPendingHodApprovals, 
    getDepartmentMentors, 
    getDepartmentStats, 
    approveAchievement, 
    rejectAchievement, 
    addFeedback,
    getDepartmentStudents,
    getMentorMentees,
    updateStudentMentor
  } = useAchievements()

  const pendingAchievements = getPendingHodApprovals(department)
  const departmentMentors = getDepartmentMentors(department)
  const departmentStudents = getDepartmentStudents(department)
  const stats = getDepartmentStats(department)

  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)
  const [dialogType, setDialogType] = useState<"approve" | "reject" | "flag" | "assign" | null>(null)
  const [comment, setComment] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setSelectedAchievement(id)
    setDialogType("approve")
  }

  const handleReject = (id: string) => {
    setSelectedAchievement(id)
    setDialogType("reject")
  }

  const handleFlag = (id: string) => {
    setSelectedAchievement(id)
    setDialogType("flag")
  }

  const handleAssignMentor = (studentId: string) => {
    setSelectedStudent(studentId)
    setDialogType("assign")
  }

  const handleSubmit = () => {
    if (dialogType === "assign" && selectedStudent && selectedMentor) {
      updateStudentMentor(selectedStudent, selectedMentor)
      toast.success("Mentor assigned", {
        description: "The student has been assigned to the selected mentor.",
      })
      setSelectedStudent(null)
      setSelectedMentor(null)
      setDialogType(null)
      return
    }

    if (!selectedAchievement || !dialogType) return

    if (dialogType === "approve") {
      approveAchievement(selectedAchievement, "hod", comment)
      toast.success("Achievement approved", {
        description: "The achievement has been approved and published.",
      })
    } else if (dialogType === "reject") {
      rejectAchievement(selectedAchievement, "hod", comment)
      toast.success("Achievement rejected", {
        description: "The achievement has been rejected.",
      })
    } else if (dialogType === "flag") {
      addFeedback(selectedAchievement, "hod", comment)
      toast.success("Achievement flagged", {
        description: "Feedback has been sent to the student.",
      })
    }

    setSelectedAchievement(null)
    setDialogType(null)
    setComment("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Department Head Dashboard</h1>
      <h2 className="text-xl font-semibold text-muted-foreground">{department} Department</h2>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMentors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAchievements}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAchievements}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="mentors">Mentors & Mentees</TabsTrigger>
          <TabsTrigger value="stats">Department Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <h2 className="text-xl font-bold">Achievements Pending Final Approval</h2>
          <AchievementList
            achievements={pendingAchievements}
            showActions
            onApprove={handleApprove}
            onReject={handleReject}
            onFlag={handleFlag}
          />
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <h2 className="text-xl font-bold">Students in {department} Department</h2>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Current Mentor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      {departmentMentors.find(m => m.id === student.mentorId)?.name || "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAssignMentor(student.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Assign Mentor
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="mentors" className="space-y-4">
          <h2 className="text-xl font-bold">Mentors and Their Mentees in {department} Department</h2>
          <div className="grid gap-6">
            {departmentMentors.map((mentor) => {
              const mentees = getMentorMentees(mentor.id)
              return (
                <Card key={mentor.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{mentor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mentor.specialization} • {mentees.length}/{mentor.maxMentees} mentees
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Roll Number</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Section</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mentees.map((mentee) => (
                          <TableRow key={mentee.id}>
                            <TableCell>{mentee.name}</TableCell>
                            <TableCell>{mentee.rollNumber}</TableCell>
                            <TableCell>{mentee.year}</TableCell>
                            <TableCell>{mentee.section}</TableCell>
                          </TableRow>
                        ))}
                        {mentees.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                              No mentees assigned yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="stats" className="space-y-4">
          <h2 className="text-xl font-bold">Department Achievement Statistics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Achievement Status</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Total Achievements</dt>
                    <dd className="text-sm font-medium">{stats.totalAchievements}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Approved</dt>
                    <dd className="text-sm font-medium">{stats.approvedAchievements}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Pending</dt>
                    <dd className="text-sm font-medium">{stats.pendingAchievements}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Rejected</dt>
                    <dd className="text-sm font-medium">{stats.rejectedAchievements}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!dialogType}
        onOpenChange={() => {
          setDialogType(null)
          setSelectedAchievement(null)
          setSelectedStudent(null)
          setSelectedMentor(null)
          setComment("")
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "approve" && "Approve Achievement"}
              {dialogType === "reject" && "Reject Achievement"}
              {dialogType === "flag" && "Flag for Review"}
              {dialogType === "assign" && "Assign Mentor"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "approve" && "Add a comment for your approval."}
              {dialogType === "reject" && "Please provide a reason for rejection."}
              {dialogType === "flag" && "Provide feedback or request additional information."}
              {dialogType === "assign" && "Select a mentor to assign to this student."}
            </DialogDescription>
          </DialogHeader>

          {dialogType === "assign" ? (
            <Select value={selectedMentor || ""} onValueChange={setSelectedMentor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a mentor" />
              </SelectTrigger>
              <SelectContent>
                {departmentMentors.map((mentor) => {
                  const mentees = getMentorMentees(mentor.id)
                  const isAvailable = mentees.length < mentor.maxMentees
                  return (
                    <SelectItem 
                      key={mentor.id} 
                      value={mentor.id}
                      disabled={!isAvailable}
                    >
                      {mentor.name} ({mentees.length}/{mentor.maxMentees} mentees)
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          ) : (
            <Textarea
              placeholder="Enter your comments here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            />
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogType(null)
                setSelectedAchievement(null)
                setSelectedStudent(null)
                setSelectedMentor(null)
                setComment("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {dialogType === "approve" && "Approve"}
              {dialogType === "reject" && "Reject"}
              {dialogType === "flag" && "Send Feedback"}
              {dialogType === "assign" && "Assign Mentor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

