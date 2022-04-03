export class ShelfRequest {
    shelfId!: number;
    shelfTypeId!: number;
    rowNumber!: number;
    customName!: string;
    currentCategory!: number;
    prohibitedCategories!: string;
    areaInSft!: number;
    costPerSft!: number;
    minimumBookingPeriodInDays!: number;
    preBookingPeriodInDays!: number;
    isActive!: boolean;
    modifiedDate!: string;
    modifiedBy!: string;
}
