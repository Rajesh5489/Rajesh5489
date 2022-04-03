import { ImageDetails } from "./ImageDetails";


export class StoreSummary {
    storeId!: number;
    storeName!: string;
    fullAddress!: string;
    country!:string;
    state!:string;
    city!:string;
    pinCode!:string;
    gstin!:string;
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
    createdDate!: string;
    createdBy!: string;
}