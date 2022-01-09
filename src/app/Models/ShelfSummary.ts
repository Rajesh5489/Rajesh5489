import { ImagesDetails } from "./ImageDetails";

export class ShelfSummary {
    shelfId!: number;
    shelfTypeId!: number;
    shelfTypeName!: number;
    rowNumber!: number;
    customName!: string;
    currentCategory!: number;
    currentCategoryName!: string;
    prohibitedCategories!: string;
    areaInSft!: number;
    costPerSft!: number;
    minimumBookingPeriodInDays!: number;
    preBookingPeriodInDays!: number;
    isActive!: boolean;
    shelfImagesDetails!: ImagesDetails[];
    createdDate!: Date;
    createdBy!: string;
}
