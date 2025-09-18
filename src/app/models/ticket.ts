export interface Ticket {
    id?: any;
    createdAt?: string;
    closedAt?: string;
    priority: string;
    status: string;
    title: string;
    observation: string;
    technicianId: any;
    technicianName: string;
    customerId: any;
    customerName: string;
}