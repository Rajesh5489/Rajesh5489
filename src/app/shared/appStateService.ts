import { Injectable } from "@angular/core";
import { StoreSummary } from "../Models/StoreSummary";

@Injectable({
    providedIn: "root"
})
export class AppStateService {
    enviromentData: any;
    retailerId: any;
    storeList!: Array<StoreSummary>;
    constructor() { }

    getBaseUrl() {
        return this.enviromentData.url + "api/";
    }
}
