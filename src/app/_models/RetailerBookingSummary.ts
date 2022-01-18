export class RetailerBookingSummary {
    bookingIds!: number[];
    storeId!: number;
    storeName!: string;
    location!: string;
    city!: string;
    state!: string;
    storeAreaInSft!: number;
    shelfTypeBookingDetails!: ShelfTypeBookingDetail[];
    totalBookingsInStore!: number;
    totalBookingAmountFromStore!: number;
    totalRevenueAmountFromStore!: number;
    endOfEngagementDate!: string;
}

export class ShelfTypeBookingDetail {
    id!: number;
    name!: string;
    bookingCount!: number;
}
