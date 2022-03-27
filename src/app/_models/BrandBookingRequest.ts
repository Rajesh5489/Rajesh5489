import { BookingLedger } from "./BookingLedger";

export class BrandBookingRequest {
    bookingId!: number;
    shelfId!: number;
    storeId!: number;
    brandId!: number;
    bookingStatus!: number;
    startDate!: string;
    endDate!: string;
    totalAmount!: number;
    bookingLedger!: BookingLedger;
    modifiedDate!: string;
    modifiedBy!: string;
}