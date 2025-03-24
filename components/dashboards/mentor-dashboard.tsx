// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useAchievements } from "@/lib/achievement-service"
// import AchievementList from "@/components/achievement/achievement-list"
// import { Users, Clock, Award } from "lucide-react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"

// export default function MentorDashboard({ mentorId }: { mentorId: string }) {
//   const { getPendingMentorApprovals, approveAchievement, rejectAchievement, addFeedback } = useAchievements()
//   const pendingAchievements = getPendingMentorApprovals(mentorId)
//   const { toast } = useToast()

//   const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)
//   const [dialogType, setDialogType] = useState<"approve" | "reject" | "flag" | null>(null)
//   const [comment, setComment] = useState("")

//   const handleApprove = (id: string) => {
//     setSelectedAchievement(id)
//     setDialogType("approve")
//   }

//   const handleReject = (id: string) => {
//     setSelectedAchievement(id)
//     setDialogType("reject")
//   }

//   const handleFlag = (id: string) => {
//     setSelectedAchievement(id)
//     setDialogType("flag")
//   }

//   const handleSubmit = () => {
//     if (!selectedAchievement || !dialogType) return

//     if (dialogType === "approve") {
//       approveAchievement(selectedAchievement, "mentor", comment)
//       toast({
//         title: "Achievement approved",
//         description: "The achievement has been sent to HOD for final approval.",
//       })
//     } else if (dialogType === "reject") {
//       rejectAchievement(selectedAchievement, "mentor", comment)
//       toast({
//         title: "Achievement rejected",
//         description: "The achievement has been rejected.",
//       })
//     } else if (dialogType === "flag") {
//       addFeedback(selectedAchievement, "mentor", comment)
//       toast({
//         title: "Achievement flagged",
//         description: "Feedback has been sent to the student.",
//       })
//     }

//     setSelectedAchievement(null)
//     setDialogType(null)
//     setComment("")
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold tracking-tight">Mentor Dashboard</h1>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Students Under Mentorship</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingAchievements.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Approved Achievements</CardTitle>
//             <Award className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="pending">
//         <TabsList>
//           <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
//           <TabsTrigger value="students">My Students</TabsTrigger>
//         </TabsList>
//         <TabsContent value="pending" className="space-y-4">
//           <h2 className="text-xl font-bold">Achievements Pending Approval</h2>
//           <AchievementList
//             achievements={pendingAchievements}
//             showActions
//             onApprove={handleApprove}
//             onReject={handleReject}
//             onFlag={handleFlag}
//           />
//         </TabsContent>
//         <TabsContent value="students" className="space-y-4">
//           <h2 className="text-xl font-bold">Students Under Your Mentorship</h2>
//           <p className="text-muted-foreground">Demo data - student list would appear here</p>
//         </TabsContent>
//       </Tabs>

//       <Dialog
//         open={!!dialogType}
//         onOpenChange={() => {
//           setDialogType(null)
//           setSelectedAchievement(null)
//           setComment("")
//         }}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {dialogType === "approve" && "Approve Achievement"}
//               {dialogType === "reject" && "Reject Achievement"}
//               {dialogType === "flag" && "Flag for Review"}
//             </DialogTitle>
//             <DialogDescription>
//               {dialogType === "approve" && "Add a comment for your approval."}
//               {dialogType === "reject" && "Please provide a reason for rejection."}
//               {dialogType === "flag" && "Provide feedback or request additional information."}
//             </DialogDescription>
//           </DialogHeader>

//           <Textarea
//             placeholder="Enter your comments here..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={5}
//           />

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setDialogType(null)
//                 setSelectedAchievement(null)
//                 setComment("")
//               }}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit}>
//               {dialogType === "approve" && "Approve"}
//               {dialogType === "reject" && "Reject"}
//               {dialogType === "flag" && "Send Feedback"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

