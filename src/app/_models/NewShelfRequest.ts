export class NewShelfRequest {
    retailerId!: number;
    storeId!: number;
    shelfTypeId!: number;
    rowNumber!: number;
    customName!: string;
    currentCategory!: number;
    prohibitedCategories!: string;
    areaInSft!: number;
    costPerSft!: number;
    minimumBookingPeriodInDays!: number;
    preBookingPeriodInDays!: number;
    createdDate!: string;
    createdBy!: string;
}
