export interface backendData {
    subject: string,
    additional_description: string,
    priority: string,
    status: string,
    start_date: Date,
    finish_date: string,
    department: string,
    assignedTo: string,
    completed_by: string,
    comments: string,
    id: number
}

export interface editTaskForm {
    id: number
    subject: string,
    additional_description: string,
    priority: string,
    status: string,
    start_date: Date,
    finish_date: string,
    department: string,
    assignedTo: string,
    comments: string,
    completed_by: string
}

export interface showTaskDetails {
    subject: string,
    additional_description: string,
    priority: string,
    status: string,
    start_date: Date,
    finish_date: string,
    department: string,
    assignedTo: string,
    completed_by: string,
    comments: string,
    id: number
}
