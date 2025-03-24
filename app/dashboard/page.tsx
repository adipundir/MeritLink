"use client"

// import StudentDashboard from "@/components/dashboards/student-dashboard"
// import MentorDashboard from "@/components/dashboards/mentor-dashboard"
import HodDashboard from "@/components/dashboards/hod-dashboard"
import AdminDashboard from "@/components/dashboards/admin-dashboard"

export default function DashboardPage() {
  // Demo user - you can change the role to see different dashboards
  const demoUser = {
    id: "demo-1",
    role: "hod", // Change to "mentor", "hod", or "admin" to see different dashboards
    department: "Computer Science"
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      {/* {demoUser.role === "student" && <StudentDashboard userId={demoUser.id} />} */}
      {/* {demoUser.role === "mentor" && <MentorDashboard mentorId={demoUser.id} />} */}
      {demoUser.role === "hod" && <HodDashboard department={demoUser.department} />}
      {demoUser.role === "admin" && <AdminDashboard />}
    </div>
  )
}

