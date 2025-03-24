// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { Trophy, Plus } from "lucide-react"
// import { useAchievements } from "@/lib/achievement-service"
// import AchievementList from "@/components/achievement/achievement-list"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function StudentDashboard({ userId }: { userId: string }) {
//   const { getStudentAchievements } = useAchievements()
//   const achievements = getStudentAchievements(userId)

//   const pendingCount = achievements.filter((a) => a.status === "pending_mentor" || a.status === "pending_hod").length

//   const approvedCount = achievements.filter((a) => a.status === "approved").length
//   const flaggedCount = achievements.filter((a) => a.status === "flagged").length

//   const pendingAchievements = achievements.filter((a) => a.status === "pending_mentor" || a.status === "pending_hod")

//   const approvedAchievements = achievements.filter((a) => a.status === "approved")
//   const flaggedAchievements = achievements.filter((a) => a.status === "flagged")

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
//         <Button asChild>
//           <Link href="/achievements/new">
//             <Plus className="mr-2 h-4 w-4" /> Submit Achievement
//           </Link>
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
//             <Trophy className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{achievements.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Approved</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{approvedCount}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="all" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="all">All Achievements</TabsTrigger>
//           <TabsTrigger value="pending">Pending</TabsTrigger>
//           <TabsTrigger value="approved">Approved</TabsTrigger>
//           <TabsTrigger value="flagged">Flagged ({flaggedCount})</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all">
//           <AchievementList achievements={achievements} />
//         </TabsContent>
//         <TabsContent value="pending">
//           <AchievementList achievements={pendingAchievements} />
//         </TabsContent>
//         <TabsContent value="approved">
//           <AchievementList achievements={approvedAchievements} />
//         </TabsContent>
//         <TabsContent value="flagged">
//           <AchievementList achievements={flaggedAchievements} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

