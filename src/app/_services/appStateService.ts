import { Injectable } from "@angular/core";
import { StoreSummary } from "../_models/StoreSummary";

@Injectable({
    providedIn: "root"
})
export class AppStateService {
    enviromentData: any;
    userType: any;
    retailerOrBrandId: any;
    userName: any;
    storeList!: Array<StoreSummary>;
    constructor() { }

    getBaseUrl() {
        return this.enviromentData.url + "api/";
    }
}
