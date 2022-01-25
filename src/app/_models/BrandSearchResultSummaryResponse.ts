import { ShelfSummary } from "./ShelfSummary";

export class BrandSearchResultSummaryResponse {
    retailerId!:number;
    retailerName!: string;
    storeId!: string;
    storeName!: string;
    storeAddress!: string;
    location!: string;
    latitude!: string;
    longitude!: string;
    projectedFootfallPerMonth!: string;
    estimatedSalesPerMonth!: string;
    noOfSpacesListed!: string;
    noOfSpacesAvailable!: string;
    storeAreaInSft!: string;
    shelves!: Array<ShelfSummary>;
    isSelected!:boolean;
}