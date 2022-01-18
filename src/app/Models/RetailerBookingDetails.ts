import { BookingLedger } from "./BookingLedger";

export class RetailerBookingDetails {
    bookingId!: number;
    shelfBookingStatusType!: string;
    clientName!: string;
    startDate!: string;
    endDate!: string;
    bookingAmount!: number;
    bookingLedger!: BookingLedger;
    createdDate!: string;
    selected!: boolean;
}