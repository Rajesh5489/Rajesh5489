export class NewStoreRequest {
    retailerId!: number;
    storeName!: string;
    fullAddress!: string;
    managerContactName!: string;
    managerContactNumber!: string;
    managerEmailAddress!: string;
    secondaryContactName!: string;
    secondaryContactNumber!: string;
    secondaryEmailAddress!: string;
    storeContactNumber!: string;
    country!: string;
    state!: string;
    city!: string;
    location!: string;
    pinCode!: string;
    latitude!: number;
    longitude!: number;
    areaInSft!: number;
    gstin!: string;
    projectedFootfallPerMonth!: number;
    estimatedSalesPerMonth!: number;
    createdDate!: string;
    createdBy!: string;
}
