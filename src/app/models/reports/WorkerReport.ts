export interface WorkerReport {
    firstName: string;
    lastName: string;
    servicesRevenue: number;
    revenueFromEachService: { [key: string]: number };
    bookingRequests: number;
    bookingRequestsCancelled: number;
    bookingRequestsCancelledWithPartialPayment: number;
    bookingRequestsCompleted: number;
}