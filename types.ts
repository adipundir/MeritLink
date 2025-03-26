export type Document = {
    name: string
    url: string
    file?: File
}

export type Feedback = {
    id: string
    from: "mentor" | "hod"
    message: string
    date: string
}

export type Approval = {
    approved: boolean
    date: string
    comment: string
}

export type Student = {
    id: string
    name: string
    email: string
    rollNumber: string
    department: string
    year: number
    section: string
    mentorId: string
}

export type Mentor = {
    id: string
    name: string
    email: string
    specialization: string
    department: string
    maxMentees: number
}

export type Achievement = {
    id: string
    title: string
    description: string
    category: string
    studentName: string
    department: string
    prize: string
    status: "approved" | "pending_mentor" | "pending_hod" | "rejected" | "flagged"
    studentImage?: string
    feedback: Array<{
        id: string
        message: string
        createdAt: string
        userId: string
    }>
    date: string
    studentId: string
    documents: string[]
    mentorApproval?: {
        status: "approved" | "rejected"
        feedback?: string
        date: string
    }
    hodApproval?: {
        status: "approved" | "rejected"
        feedback?: string
        date: string
    }
    severity?: "low" | "medium" | "high"
}