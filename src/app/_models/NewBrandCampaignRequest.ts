export class NewBrandCampaignRequest {
    brandId!:number;
    name!: string;
    objective!: string;
    description!: string;
    productName!: string;
    startDate!: string;
    endDate!: string;
    tagIds!:Array<number>;
    createdDate!: string;
    createdBy!: string;
}
