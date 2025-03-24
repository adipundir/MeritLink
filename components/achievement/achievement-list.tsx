"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { CheckCircle, XCircle, Clock, Award, Flag } from "lucide-react"
import type { Achievement } from "@/types"
import { getCategoryColor, getStatusColor, getStatusText } from "@/lib/mock-data"

export default function AchievementList({
  achievements,
  showActions = false,
  onApprove,
  onReject,
  onFlag,
}: {
  achievements: Achievement[]
  showActions?: boolean
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  onFlag?: (id: string) => void
}) {
  if (achievements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Award className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No achievements found</h3>
        <p className="text-sm text-muted-foreground">There are no achievements to display at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Link href={`/achievements/${achievement.id}`} key={achievement.id}>
          <Card className="overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">{achievement.title}</CardTitle>
                <Badge variant="outline">{achievement.category}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={achievement.studentImage || "/avatars/placeholder.png"} alt={achievement.studentName} />
                  <AvatarFallback>{achievement.studentName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{achievement.studentName}</span>
                  <span>•</span>
                  <span>{achievement.department}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{achievement.description}</p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium">
                  {achievement.prize}
                </span>
              </div>

              {achievement?.feedback?.length > 0 && (
                <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-200">
                  <p className="text-xs font-medium text-amber-800">Feedback Required:</p>
                  <p className="text-xs text-amber-700">
                    {achievement.feedback[achievement.feedback.length - 1].message}
                  </p>
                </div>
              )}
            </CardContent>
            {showActions && (achievement.status === "pending_mentor" || achievement.status === "pending_hod") && (
              <CardFooter className="flex justify-end pt-0">
                <div className="flex gap-2">
                  <Button variant="default" size="sm" onClick={(e) => {
                    e.preventDefault();
                    onApprove && onApprove(achievement.id);
                  }}>
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={(e) => {
                    e.preventDefault();
                    onReject && onReject(achievement.id);
                  }}>
                    Reject
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.preventDefault();
                    onFlag && onFlag(achievement.id);
                  }}>
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </Link>
      ))}
    </div>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "flagged":
      return <Flag className="h-4 w-4 text-orange-500" />
    default:
      return <Clock className="h-4 w-4 text-yellow-500" />
  }
}

