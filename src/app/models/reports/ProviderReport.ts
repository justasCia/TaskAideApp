import { WorkerReport } from "./WorkerReport";

export interface ProviderReport {
    materialsCost: number;
    servicesRevenue: number;
    totalIncome: number;
    revenueFromEachService: { [key: string]: number };
    bookingRequests: number;
    bookingRequestsCancelled: number;
    bookingRequestsCancelledWithPartialPayment: number;
    bookingRequestsCompleted: number;
    favouriteBookingRequest: string;
    workerReports?: WorkerReport[];
}