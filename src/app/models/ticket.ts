export interface Ticket {
    id?: any;
    createdAt?: string;
    closedAt?: string;
    priority: string;
    status: string;
    title: string;
    observation: string;
    technician: any;
    customer: any;
}