import { ImageDetails } from "./ImageDetails";


export class StoreSummary {
    storeId!: number;
    storeName!: string;
    fullAddress!: string;
    managerContactName!: string;
    managerContactNumber!: string;
    managerEmailAddress!: string;
    secondaryContactName!: string;
    secondaryContactNumber!: string;
    secondaryEmailAddress!: string;
    storeContactNumber!: string;
    location!: string;
    latitude!: number;
    longitude!: number;
    areaInSft!: number;
    projectedFootfallPerMonth!: number;
    estimatedSalesPerMonth!: number;
    storeImagesDetails!: ImageDetails[];
    createdDate!: Date;
    createdBy!: string;
}